import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Pedido, PedidoDetalleDto } from '../../interface/ventas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-table',
  standalone: false,
  templateUrl: './ventas-table.component.html',
  styleUrl: './ventas-table.component.css'
})
export class VentasTableComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoDetalle: PedidoDetalleDto | null = null;
  mostrarModalDetalle: boolean = false;

  //Filtros
  pedidosFiltrados: Pedido[] = [];
  filtroNombre: string = '';
  pedidoSeleccionado?: Pedido;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.ventasService.getAllPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error('Error cargando pedidos', err)
    });
  }

  eliminarPedido(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Se eliminará el pedido. Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',  // Rojo (puedes cambiarlo)
    cancelButtonColor: '#6c757d',   // Gris
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventasService.eliminarPedido(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El pedido fue eliminado correctamente',
              confirmButtonColor: '#0062BA'  // Azul (opcional)
            });
            this.cargarPedidos();  // Recargar la lista
          },
          error: (err) => {
            console.error('Error eliminando pedido', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el pedido',
              confirmButtonColor: '#dc3545'  // Rojo
            });
          }
        });
      }
    });
  }

 cambiarEstatus(id: number, nuevoEstatus: number): void {
    const nuevoEstatusActualizado = nuevoEstatus === 1 ? 2 : nuevoEstatus === 2 ? 3 : nuevoEstatus;
    
    // Mostrar loader (se cierra automáticamente al terminar la operación)
    Swal.fire({
      title: 'Actualizando estado...',
      html: 'Por favor espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Activa el spinner
      }
    });

    this.ventasService.actualizarEstatus(id, nuevoEstatusActualizado).subscribe({
      next: () => {
        Swal.close(); // Cierra el loader
        this.cargarPedidos(); // Recarga los datos
        Swal.fire({
          icon: 'success',
          title: '¡Listo!',
          text: 'Estado actualizado correctamente',
          confirmButtonColor: '#0062BA'
        });
      },
      error: (err) => {
        Swal.close(); // Cierra el loader si hay error
        let texto: string;
        let titulo: string;
        let icon: 'warning' | 'error';

        if (err.status === 404) {
          texto = 'No se cuentan con suficientes insumos para completar el pedido';
          titulo = 'Advertencia';
          icon = 'warning';
        } else {
          texto = 'Error actualizando estatus';
          titulo = 'Error';
          icon = 'error';
        }

        Swal.fire({
          icon: icon,
          title: titulo,
          text: texto,
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  abrirDetallePedido(idPedido: number) {
    this.ventasService.getPedidoById(idPedido).subscribe({
      next: (data) => {
        this.pedidoDetalle = data;
        this.mostrarModalDetalle = true;
      },
      error: (err) => console.error('Error al obtener detalle:', err)
    });
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
    this.pedidoDetalle = null;
  }

  filtrarPedidos(): void {
    const filtro = this.filtroNombre.trim().toLowerCase();
    if (!filtro) {
      this.pedidosFiltrados = [...this.pedidos];
    } else {
      this.pedidosFiltrados = this.pedidos.filter(p =>
        p.nombreCliente.toLowerCase().includes(filtro)
      );
    }
  }
}