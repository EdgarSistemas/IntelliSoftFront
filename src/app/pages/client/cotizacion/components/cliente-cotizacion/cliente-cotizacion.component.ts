import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CotizacionService } from '../../../../home/cotizacion/services/cotizacion.service';
import { Productos } from '../../../../admin/productos/interface/productos';

type PartidaUI = {
  productoId: number;
  nombreProducto: string;
  hectareas: number; // entero >= hectareasMinimas
  hectareasMinimas: number; // del producto.hectareaBase o 1
};

@Component({
  selector: 'app-cliente-cotizacion',
  standalone: false,
  templateUrl: './cliente-cotizacion.component.html',
  styleUrls: ['./cliente-cotizacion.component.css'],
})
export class ClienteCotizacionComponent implements OnInit {
  // Sólo comentario (no mezclar controles reactivos con ngModel)
  formularioCotizacion = new FormGroup({
    detalles: new FormControl<string>(''),
  });

  productos: Productos[] = [];
  productoIdSeleccionado: number | null = null;
  usuarioId: string | null = null;

  // Varias partidas
  carrito: PartidaUI[] = [];
  readonly LIMITE_POR_PRODUCTO = 3;

  // loaders
  enviando = false;
  loadingProductos = false;

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('usuarioId');

    if (!this.usuarioId) {
      Swal.fire(
        'Error',
        'No se encontró el ID de usuario en el localStorage',
        'error'
      );
      return;
    }

    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loadingProductos = true;
    this.cotizacionService.allProducts().subscribe({
      next: (data) => {
        this.productos = data || [];
        this.loadingProductos = false;
      },
      error: (error) => {
        this.loadingProductos = false;
        console.error('Error al obtener productos', error);
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      },
    });
  }

  // ===== Helpers =====

  getCountPorProducto(productoId: number): number {
    return this.carrito.filter((p) => p.productoId === productoId).length;
  }

  soloEnteros(ev: KeyboardEvent): void {
    const allow = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allow.includes(ev.key)) return;
    if (!/^[0-9]$/.test(ev.key)) ev.preventDefault();
  }

  normalizarHectareas(item: PartidaUI): void {
    const h = Number(item.hectareas);
    const minimo = item.hectareasMinimas || 1;
    if (!Number.isFinite(h) || h < minimo) item.hectareas = minimo;
    item.hectareas = Math.floor(item.hectareas);
  }

  // ===== Carrito =====

  agregarPartida(producto: Productos): void {
    if (!producto?.idProductos) {
      Swal.fire('Error', 'Producto no válido', 'error');
      return;
    }

    if (
      this.getCountPorProducto(producto.idProductos) >= this.LIMITE_POR_PRODUCTO
    ) {
      Swal.fire(
        'Límite alcanzado',
        `Solo puedes agregar ${this.LIMITE_POR_PRODUCTO} partidas del mismo producto.`,
        'info'
      );
      return;
    }

    const minimo = producto.hectareaBase || 1;

    // Agrega con hectáreas iniciales = hectareaBase
    this.carrito.push({
      productoId: producto.idProductos,
      nombreProducto: producto.nombre,
      hectareas: minimo,
      hectareasMinimas: minimo,
    });

    this.productoIdSeleccionado = producto.idProductos;
  }

  eliminarPartida(index: number): void {
    if (index < 0 || index >= this.carrito.length) return;
    const eliminado = this.carrito.splice(index, 1)[0];

    if (
      eliminado &&
      this.productoIdSeleccionado === eliminado.productoId &&
      this.carrito.every((p) => p.productoId !== eliminado.productoId)
    ) {
      this.productoIdSeleccionado = null;
    }
  }

  limpiarCarrito(): void {
    this.carrito = [];
    this.productoIdSeleccionado = null;
    this.formularioCotizacion.patchValue({ detalles: '' });
  }

  // ===== Envío =====

  enviarCotizacion(): void {
    if (!this.usuarioId) {
      Swal.fire('Error', 'No se encontró el ID de usuario', 'error');
      return;
    }

    if (this.carrito.length === 0) {
      Swal.fire(
        'Atención',
        'Agrega al menos una partida antes de enviar.',
        'info'
      );
      return;
    }

    // Valida y normaliza todas
    this.carrito.forEach((p) => this.normalizarHectareas(p));

    const payload = {
      usuarioId: this.usuarioId!,
      detalleCotizacion: this.formularioCotizacion.value.detalles || '',
      partidas: this.carrito.map((p) => ({
        productoId: p.productoId,
        hectareas: Number(p.hectareas), // SE TOMA DE LA TABLA
      })),
    };

    this.enviando = true;
    Swal.fire({
      title: 'Enviando cotización…',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    this.cotizacionService.crearCotizacionMultiple(payload).subscribe({
      next: (res) => {
        this.enviando = false;
        Swal.close();
        const clave = (res as any)?.claveCotizacion || 'generada';
        Swal.fire('¡Cotización creada!', `Clave: ${clave}`, 'success');

        // Reset
        this.formularioCotizacion.reset();
        this.productoIdSeleccionado = null;
        this.carrito = [];
      },
      error: (error) => {
        this.enviando = false;
        Swal.close();
        console.error('Error:', error);
        const msg = error?.error?.message || 'No se pudo crear la cotización';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
}
