import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CotizacionResumen } from '../../interface/cotizacion.interface';
import { CotizacionService } from '../../services/cotizacion.service';
import {
  CotizacionDetalle,
  CotizacionDto,
} from '../../interface/cotizacion.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-cotizacion-tabla',
  standalone: false,
  templateUrl: './cotizacion-tabla.component.html',
  styleUrl: './cotizacion-tabla.component.css',
})
export class CotizacionTablaComponent {
  cotizaciones: CotizacionResumen[] = [];
  cotizacionesFiltradas: CotizacionResumen[] = [];
  filtro: string = '';
  isLoading: boolean = false;
  mostrarModalDetalle: boolean = false;
  cotizacionSeleccionada: CotizacionDto | null = null;

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones(): void {
    this.isLoading = true;
    this.cotizacionService.getResumenCotizaciones().subscribe({
      next: (res) => {
        this.cotizaciones = res;
        this.cotizacionesFiltradas = [...res];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar las cotizaciones', 'error');
      },
    });
  }

  actualizarListado(): void {
    this.cargarCotizaciones();
  }

  filtrar(): void {
    const term = this.filtro.toLowerCase();
    this.cotizacionesFiltradas = this.cotizaciones.filter(
      (c) =>
        c.claveCotizacion.toLowerCase().includes(term) ||
        c.nombreCliente.toLowerCase().includes(term)
    );
  }

  aceptarCotizacion(id: number): void {
    Swal.fire({
      title: '¿Aceptar cotización?',
      text: 'Esta acción generará un pedido y enviará acceso al cliente.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0062BA',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cotizacionService.getCotizacionById(id).subscribe({
          next: (cotizacion) => {
            const dto = {
              idCotizacion: id,
              usuarioId: cotizacion.usuarioId,
            };
            this.cotizacionService.aceptarCotizacion(dto).subscribe({
              next: (res) => {
                Swal.fire(
                  'Éxito',
                  res.message || 'Cotización aceptada correctamente',
                  'success'
                );
                this.cargarCotizaciones();
              },
              error: () => {
                Swal.fire('Error', 'No se pudo aceptar la cotización', 'error');
              },
            });
          },
          error: () => {
            Swal.fire(
              'Error',
              'No se pudo obtener la cotización para aceptar',
              'error'
            );
          },
        });
      }
    });
  }

  rechazarCotizacion(id: number): void {
    Swal.fire({
      title: '¿Rechazar cotización?',
      text: `Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const dto = {
          idCotizacion: id,
          nuevoEstado: 3,
        };
        this.cotizacionService.cambiarEstado(dto).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Cotización rechazada',
              text: res.message || 'Cotización rechazada correctamente',
              confirmButtonColor: '#0062BA',
            });
            this.cargarCotizaciones();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo rechazar la cotización', 'error');
          },
        });
      }
    });
  }

  verCotizacion(id: number): void {
    this.cotizacionService.getCotizacionById(id).subscribe({
      next: (data) => {
        this.cotizacionSeleccionada = data;
        this.mostrarModalDetalle = true;
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudo cargar el detalle de la cotización',
          'error'
        );
      },
    });
  }

  cerrarModalDetalle(): void {
    this.mostrarModalDetalle = false;
    this.cotizacionSeleccionada = null;
  }
}
