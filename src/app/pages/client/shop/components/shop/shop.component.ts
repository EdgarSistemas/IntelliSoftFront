import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../profile/services/profile.service';
import { ShopService } from '../../services/shop.service';
import { Profile } from '../../../profile/interface/profile';
import { PedidoResponse, Opinion } from '../../interface/shop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  details: Profile | null = null;

  // listado
  pedidos: PedidoResponse[] = [];
  cargando = true;
  activePanelIndex: number | null = null;

  // modal opinión
  modalAbierto = false;
  nuevaOpinion: Opinion = {
    productoId: 0,
    calificacion: 5,
    comentario: '',
  };

  // acción pagar
  pagando = false;

  constructor(
    private profileService: ProfileService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.cargarDataProfile();
    this.obtenerPedidosUsuario();
  }

  cargarDataProfile(): void {
    this.profileService.getUserDetail().subscribe({
      next: (data) => {
        this.details = data;
      },
      error: (err) => console.error('Error perfil:', err),
    });
  }

  obtenerPedidosUsuario(): void {
    this.cargando = true;
    this.shopService.getPedidosPorUsuario().subscribe({
      next: (data) => {
        // normaliza estatus y arrays
        this.pedidos = (data || []).map((p) => ({
          ...p,
          estatus: p.estatus ?? 0,
          partidas: (p.partidas || []).map((pa) => ({
            ...pa,
            detalles: pa.detalles || [],
          })),
        }));
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos del usuario:', err);
        this.cargando = false;
        Swal.fire('Error', 'No se pudieron cargar tus pedidos.', 'error');
      },
    });
  }

  actualizarListado(): void {
    this.obtenerPedidosUsuario();
  }

  /** === Render helpers === */
  getNombreEstatus(estatus: number | null | undefined): string {
    switch (estatus ?? 0) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En Proceso';
      case 4:
        return 'Pagado';
      case 3:
        return 'Completado';
      default:
        return 'Desconocido';
    }
  }

  getBadgeClass(estatus: number | null | undefined): string {
    const e = estatus ?? 0;
    if (e === 1) return 'bg-secondary';
    if (e === 2) return 'bg-warning text-dark';
    if (e === 4) return 'bg-info text-dark';
    if (e === 3) return 'bg-success';
    return 'bg-secondary';
  }

  getBadgeIcon(estatus: number | null | undefined): string {
    const e = estatus ?? 0;
    if (e === 1) return 'bi-hourglass-split';
    if (e === 2) return 'bi-arrow-repeat';
    if (e === 4) return 'bi-cash-stack';
    if (e === 3) return 'bi-check-circle';
    return 'bi-question-circle';
  }

  /** Solo usamos el total final (venta) */
  getTotalPedido(pedido: PedidoResponse): number {
    return pedido?.totalPrecioConGanancia ?? 0;
  }

  /** === Opiniones === */
  abrirModal(productoId: number) {
    this.modalAbierto = true;
    this.nuevaOpinion = {
      productoId,
      calificacion: 5,
      comentario: '',
    };
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  enviarOpinion() {
    this.shopService.crearOpinion(this.nuevaOpinion).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Opinión enviada',
          text: 'Gracias por tu comentario.',
          confirmButtonText: 'Aceptar',
        });
        this.cerrarModal();
        this.nuevaOpinion = { productoId: 0, calificacion: 5, comentario: '' };
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo enviar la opinión.',
          confirmButtonText: 'Aceptar',
        });
        console.error(err);
      },
    });
  }

  // Toggle acordeón
  togglePanel(index: number): void {
    this.activePanelIndex = this.activePanelIndex === index ? null : index;
  }

  /** === Pagar (cliente) -> /api/pedidos/{id}/pagado === */
  pagarPedido(idPedido: number): void {
    if (!idPedido) return;

    Swal.fire({
      title: 'Marcar pedido como pagado',
      text: 'Confirmas que ya realizaste el pago de este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, marcar pagado',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0062BA',
      cancelButtonColor: '#6c757d',
    }).then((r) => {
      if (!r.isConfirmed) return;

      this.pagando = true;
      Swal.fire({
        title: 'Procesando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      this.shopService.marcarPagado(idPedido).subscribe({
        next: (res) => {
          this.pagando = false;
          Swal.close();
          Swal.fire(
            '¡Listo!',
            res?.message || 'El pedido fue marcado como pagado.',
            'success'
          );
          this.actualizarListado();
        },
        error: (err) => {
          this.pagando = false;
          Swal.close();
          const msg = err?.error?.message || 'No se pudo marcar como pagado.';
          Swal.fire('Error', msg, 'error');
        },
      });
    });
  }
}
