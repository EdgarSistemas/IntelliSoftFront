import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CompraService } from './../../services/compras.service';
import { CompraDetalle, CompraDetalleItem, CompraResumen } from './../../interface/compra.interface';
import {
  InventariarCompraDto,
  InsumoInventariadoDto
} from '../../interface/inventario-create.interface';

@Component({
  selector: 'admin-compra-tabla',
  templateUrl: './compra-tabla.component.html',
  standalone:false,
  styleUrls: ['./compra-tabla.component.css']
})
export class CompraTablaComponent implements OnInit {
  compras: CompraResumen[] = [];
  comprasFiltradas: CompraResumen[] = [];
  filtro = '';
  filtroEstatus: string = '';
  isLoading = false;

  mostrarFormulario = false;
  mostrarModalDetalle = false;
  mostrarModalInventario = false;

  compraSeleccionada: CompraDetalle | null = null;
  compraAInventariar: CompraDetalle | null = null;
  detallesInventario: CompraDetalleItem[] = [];

  insumosInventariados: (InsumoInventariadoDto & { unidadesPorPresentacion?: number })[] = [];

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.isLoading = true;
    this.compraService.obtenerCompras().subscribe({
      next: (data) => {
        this.compras = data;
        this.comprasFiltradas = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar las compras', 'error');
      }
    });
  }

  filtrarCompras(): void {
    const texto = this.filtro.toLowerCase().trim();
    this.comprasFiltradas = this.compras.filter((compra) => {
      const coincideTexto =
        compra.claveCompra.toLowerCase().includes(texto) ||
        compra.proveedor?.nombre?.toLowerCase().includes(texto) ||
        compra.observacion?.toLowerCase().includes(texto);

      const coincideEstatus =
        this.filtroEstatus === '' || compra.estatus.toString() === this.filtroEstatus;

      return coincideTexto && coincideEstatus;
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onCompraGuardada(): void {
    this.mostrarFormulario = false;
    this.cargarCompras();
  }

  verDetalle(id: number): void {
    this.compraService.obtenerCompraPorId(id).subscribe({
      next: (data) => {
        this.compraSeleccionada = data;
        this.mostrarModalDetalle = true;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener el detalle de la compra', 'error');
      }
    });
  }

  cerrarModalDetalle(): void {
    this.mostrarModalDetalle = false;
    this.compraSeleccionada = null;
  }

  calcularTotal(compra: CompraDetalle | null): number {
    if (!compra || !compra.detalles) {
      return 0;
    }
    return compra.detalles.reduce((acc, detalle) => acc + (detalle.precioUnitario * detalle.cantidad), 0);
  }

  cancelarCompra(id: number): void {
    Swal.fire({
      title: '¿Cancelar compra?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraService.cancelarCompra(id).subscribe({
          next: () => {
            Swal.fire('Cancelada', 'La compra fue cancelada correctamente', 'success');
            this.cargarCompras();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo cancelar la compra', 'error');
          }
        });
      }
    });
  }

  abrirModalInventario(idCompra: number): void {
    this.compraService.obtenerCompraPorId(idCompra).subscribe({
      next: (compra) => {
        this.compraAInventariar = compra;
        this.compraService.obtenerDetalleParaInventario(idCompra).subscribe({
          next: (detalles) => {
            this.detallesInventario = detalles;
            this.insumosInventariados = detalles.map(det => ({
              insumoId: det.insumoId,
              unidadesPorPresentacion: 0,
              cantidadUnidad: 0,
              costoUnitario: 0
            }));
            this.mostrarModalInventario = true;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo obtener el detalle para inventariar', 'error');
          }
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener la compra', 'error');
      }
    });
  }

  actualizarCantidadUnidad(index: number): void {
    const detalle = this.detallesInventario[index];
    const inventario = this.insumosInventariados[index];

    if (detalle && inventario && inventario.unidadesPorPresentacion && inventario.unidadesPorPresentacion > 0) {
      const totalUnidades = detalle.cantidad * inventario.unidadesPorPresentacion;
      const costoTotal = detalle.precioUnitario * detalle.cantidad;
      const costoUnitario = costoTotal / totalUnidades;

      inventario.cantidadUnidad = totalUnidades;
      inventario.costoUnitario = parseFloat(costoUnitario.toFixed(2)); // redondear a 2 decimales
    }
  }

  cerrarModalInventario(): void {
    this.mostrarModalInventario = false;
    this.compraAInventariar = null;
    this.detallesInventario = [];
    this.insumosInventariados = [];
  }

  confirmarInventario(): void {
    if (!this.compraAInventariar) return;

    const dto: InventariarCompraDto = {
      compraId: this.compraAInventariar.idCompra,
      insumosInventariados: this.insumosInventariados.map(i => ({
        insumoId: i.insumoId,
        cantidadUnidad: i.cantidadUnidad,
        costoUnitario: i.costoUnitario
      }))
    };

    const incompletos = dto.insumosInventariados.some(i => i.cantidadUnidad <= 0 || i.costoUnitario <= 0);
    if (incompletos) {
      Swal.fire('Atención', 'Completa todos los campos antes de guardar.', 'warning');
      return;
    }

    this.compraService.inventariarCompra(dto).subscribe({
      next: (res) => {
        Swal.fire('Inventario completado', res.message, 'success');
        this.cerrarModalInventario();
        this.cargarCompras();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo completar el inventario', 'error');
      }
    });
  }
}
