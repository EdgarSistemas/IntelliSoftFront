// cotizacion-tabla.component.ts
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  CotizacionResumen,
  CotizacionResumenApi,
  CotizacionFull,
  CotizacionEstadoUpdateDto,
  AceptarCotizacionDto,
  EnviarPdfDto,
} from '../../interface/cotizacion.interface';
import { CotizacionService } from '../../services/cotizacion.service';
import { HttpResponse } from '@angular/common/http';

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
  cotizacionSeleccionada: CotizacionFull | null = null;
  isDetalleLoading: boolean = false;
  isEnviarLoading = false;
  isAceptarLoading = false;

  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  // === Listado ===
  private mapResumen(api: CotizacionResumenApi): CotizacionResumen {
    const partidas = api.partidas || [];
    const sum = <K extends keyof (typeof partidas)[number]>(key: K) =>
      partidas.reduce((acc, p) => acc + (Number(p[key]) || 0), 0);

    return {
      idCotizacion: api.idCotizacion,
      claveCotizacion: api.claveCotizacion ?? '',
      nombreCliente: (partidas[0]?.nombreCliente ?? '') as string,
      hectareas: sum('hectareas'),
      estadoSolicitud: api.estatus,
      fechaSolicitud: api.fechaSolicitud ?? '',
      precioBase: sum('precioBase'),
      ganancia: sum('ganancia'),
      precioConGanancia: sum('precioConGanancia'),
      precioConRiesgo: sum('precioConRiesgo'),
      total: Number(api.totalCotizacion ?? sum('total')),
    };
  }

  cargarCotizaciones(): void {
    this.isLoading = true;
    this.cotizacionService.getResumenCotizaciones().subscribe({
      next: (res) => {
        this.cotizaciones = (res || []).map(this.mapResumen.bind(this));
        this.cotizacionesFiltradas = [...this.cotizaciones];
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
    const term = this.filtro.toLowerCase().trim();
    this.cotizacionesFiltradas = this.cotizaciones.filter(
      (c) =>
        (c.claveCotizacion || '').toLowerCase().includes(term) ||
        (c.nombreCliente || '').toLowerCase().includes(term)
    );
  }

  // === Modal Detalle ===
  verCotizacion(id: number): void {
    this.mostrarModalDetalle = true;
    this.isDetalleLoading = true;
    this.cotizacionSeleccionada = null;

    this.cotizacionService.getCotizacionById(id).subscribe({
      next: (data) => {
        this.cotizacionSeleccionada = data;
        this.isDetalleLoading = false;
      },
      error: () => {
        this.isDetalleLoading = false;
        this.mostrarModalDetalle = false;
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
    this.isDetalleLoading = false;
  }

  // === Acciones en modal ===
  aceptarCotizacion(id?: number | null): void {
    if (!id || this.isAceptarLoading) return;

    Swal.fire({
      title: '¿Aceptar cotización?',
      text: 'Esta acción generará un pedido y enviará acceso al cliente.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.isAceptarLoading = true;
      const dto: AceptarCotizacionDto = { idCotizacion: id };

      this.cotizacionService.aceptarCotizacion(dto).subscribe({
        next: (res) => {
          this.isAceptarLoading = false;
          Swal.fire(
            'Éxito',
            res?.message || 'Cotización aceptada correctamente',
            'success'
          );
          this.cerrarModalDetalle();
          this.cargarCotizaciones();
        },
        error: () => {
          this.isAceptarLoading = false;
          Swal.fire('Error', 'No se pudo aceptar la cotización', 'error');
        },
      });
    });
  }

  rechazarCotizacion(id?: number | null): void {
    if (!id) return;

    Swal.fire({
      title: '¿Rechazar cotización?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) return;

      const dto: CotizacionEstadoUpdateDto = {
        idCotizacion: id,
        nuevoEstado: 3,
      };
      this.cotizacionService.cambiarEstado(dto).subscribe({
        next: (res) => {
          Swal.fire(
            'Éxito',
            res?.message || 'Cotización rechazada correctamente',
            'success'
          );
          this.cerrarModalDetalle();
          this.cargarCotizaciones();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo rechazar la cotización', 'error');
        },
      });
    });
  }

  enviarCotizacionPdf(id?: number | null): void {
    if (!id || this.isEnviarLoading) return;

    this.isEnviarLoading = true;
    const dto: EnviarPdfDto = { idCotizacion: id }; // los demás campos pueden ir vacíos

    this.cotizacionService.enviarPdf(dto).subscribe({
      next: (res) => {
        this.isEnviarLoading = false;
        Swal.fire(
          'Enviado',
          res?.message || 'Se envió el correo con la cotización en PDF.',
          'success'
        );
      },
      error: () => {
        this.isEnviarLoading = false;
        Swal.fire(
          'Error',
          'No se pudo enviar el correo con la cotización.',
          'error'
        );
      },
    });
  }

  descargarCotizacionPdf(id?: number | null): void {
    if (!id) return;

    this.cotizacionService.descargarPdf(id).subscribe({
      next: (resp: HttpResponse<Blob>) => {
        const blob = resp.body as Blob;
        if (!blob) {
          Swal.fire('Error', 'No se recibió el archivo PDF.', 'error');
          return;
        }

        // Nombre de archivo desde content-disposition (si viene)
        const dispo = resp.headers.get('content-disposition') || '';
        const match = dispo.match(/filename="?([^"]+)"?/i);
        const filename =
          match?.[1] ||
          `Cotizacion-${
            this.cotizacionSeleccionada?.claveCotizacion || id
          }.pdf`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudo descargar el PDF de la cotización.',
          'error'
        );
      },
    });
  }
}
