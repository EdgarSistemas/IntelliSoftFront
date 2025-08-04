import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CotizacionService } from '../../../../home/cotizacion/services/cotizacion.service';
import Swal from 'sweetalert2';
import { Productos } from '../../../../admin/productos/interface/productos';

@Component({
  selector: 'app-cliente-cotizacion',
  standalone: false,
  templateUrl: './cliente-cotizacion.component.html',
  styleUrls: ['./cliente-cotizacion.component.css']
})
export class ClienteCotizacionComponent implements OnInit {
  formularioCotizacion = new FormGroup({
    producto: new FormControl<number | null>(null, [Validators.required]),
    hectareas: new FormControl(0, [Validators.required, Validators.min(1)]),
    detalles: new FormControl('')
  });

  productos: Productos[] = [];
  productoIdSeleccionado: number | null = null;
  usuarioId: string | null = null;

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('usuarioId');

    if (!this.usuarioId) {
      Swal.fire('Error', 'No se encontró el ID de usuario en el localStorage', 'error');
      this.formularioCotizacion.disable(); // Desactiva el formulario si no hay usuario
      return;
    }

    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cotizacionService.allProducts().subscribe({
      next: (data) => this.productos = data,
      error: (error) => {
        console.error('Error al obtener productos', error);
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      }
    });
  }

  enviarCotizacion(): void {
    if (this.formularioCotizacion.valid && this.productoIdSeleccionado && this.usuarioId) {
      const cotizacionData = {
        productoId: this.productoIdSeleccionado,
        hectareas: this.formularioCotizacion.value.hectareas || 0,
        usuarioId: this.usuarioId,
        detalleCotizacion: this.formularioCotizacion.value.detalles || ''
      };

      this.cotizacionService.enviarCotizacion(cotizacionData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cotización enviada correctamente', 'success');
          this.formularioCotizacion.reset();
          this.productoIdSeleccionado = null;
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire('Error', 'No se pudo enviar la cotización', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Completa todos los campos y selecciona un producto', 'error');
      this.formularioCotizacion.markAllAsTouched();
    }
  }

  seleccionarProducto(producto: Productos): void {
    if (producto?.idProductos) {
      this.productoIdSeleccionado = producto.idProductos;
      this.formularioCotizacion.patchValue({ producto: producto.idProductos });
    } else {
      console.error("Producto no válido");
    }
  }
}
