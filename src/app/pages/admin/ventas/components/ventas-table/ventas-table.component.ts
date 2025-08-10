import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VentasService } from '../../services/ventas.service';
import { PedidoResponse } from '../../interface/ventas';

@Component({
  selector: 'app-ventas-table',
  standalone: false,
  templateUrl: './ventas-table.component.html',
  styleUrl: './ventas-table.component.css',
})
export class VentasTableComponent implements OnInit {
  // listado
  pedidos: PedidoResponse[] = [];
  pedidosFiltrados: PedidoResponse[] = [];
  filtro: string = '';
  filtroEstatus: number = 0; // 0 = todos
  isLoading = false;

  // modal detalle
  mostrarModalDetalle = false;
  isDetalleLoading = false;
  isAccionLoading = false;
  pedidoSeleccionado: PedidoResponse | null = null;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  // texto de estatus para usarlo en el filtro por texto
  private estatusTexto(estatus?: number | null): string {
    const e = estatus ?? 0;
    if (e === 1) return 'pendiente';
    if (e === 2) return 'en proceso';
    if (e === 4) return 'pagado';
    if (e === 3) return 'completado';
    return '';
    }

  // formatea números como aparecen en tabla (aprox) para que coincida el texto buscado
  private n(v: number | null | undefined): string {
    const num = Number(v ?? 0);
    // 2 decimales como en la tabla (sin símbolo $)
    return num.toFixed(2);
  }

  aplicarFiltros(): void {
    const term = (this.filtro || '').toLowerCase().trim();

    this.pedidosFiltrados = this.pedidos.filter((p) => {
      // filtro por estatus (select)
      const matchEstatus =
        this.filtroEstatus === 0 || (p.estatus ?? 0) === this.filtroEstatus;

      if (!term) return matchEstatus;

      // filtro por cualquier dato visible en la tabla
      const textoFila =
        [
          String(p.cotizacionClave || ''),
          (p.nombreCliente || '').toLowerCase(),
          this.estatusTexto(p.estatus),
          this.n(p.totalPrecioBase),
          this.n(p.totalGanancia),
          this.n(p.totalPrecioConGanancia),
        ]
          .join(' ')
          .toLowerCase();

      const matchTexto = textoFila.includes(term);

      return matchEstatus && matchTexto;
    });
  }

  // === Listado ===
  cargarPedidos(): void {
    this.isLoading = true;
    this.ventasService.getAllPedidos().subscribe({
      next: (res) => {
        // normaliza estatus (puede venir null)
        this.pedidos = (res || []).map((p) => ({
          ...p,
          estatus: p.estatus ?? 0,
        }));
        this.aplicarFiltros(); // respeta los filtros actuales
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
      },
    });
  }

  actualizarListado(): void {
    this.cargarPedidos();
  }

  // === Modal Detalle ===
  verPedido(idPedido: number): void {
    if (!idPedido) return;
    this.mostrarModalDetalle = true;
    this.isDetalleLoading = true;
    this.pedidoSeleccionado = null;

    this.ventasService.getPedidoById(idPedido).subscribe({
      next: (data) => {
        // normaliza estructura para la vista
        this.pedidoSeleccionado = {
          ...data,
          estatus: data.estatus ?? 0,
          partidas: (data.partidas || []).map((p) => ({
            ...p,
            detalles: p.detalles || [], // asegura arreglo
          })),
        };
        this.isDetalleLoading = false;
      },
      error: () => {
        this.isDetalleLoading = false;
        Swal.fire('Error', 'No se pudo cargar el detalle del pedido', 'error');
        this.mostrarModalDetalle = false;
      },
    });
  }

  cerrarModalDetalle(): void {
    if (this.isAccionLoading) return; // evita cerrar durante acción
    this.mostrarModalDetalle = false;
    this.pedidoSeleccionado = null;
  }

  // === Acciones ===
  cancelarPedido(id?: number | null): void {
    if (!id) return;
    Swal.fire({
      title: '¿Cancelar pedido?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
    }).then((r) => {
      if (!r.isConfirmed) return;

      this.isAccionLoading = true;
      Swal.fire({
        title: 'Cancelando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      this.ventasService.cancelarPedido(id).subscribe({
        next: (res) => {
          this.isAccionLoading = false;
          Swal.close();
          Swal.fire(
            'Cancelado',
            res?.message || 'Pedido cancelado correctamente',
            'success'
          );
          this.cargarPedidos();
          this.cerrarModalDetalle();
        },
        error: (err) => {
          this.isAccionLoading = false;
          Swal.close();
          const msg = err?.error?.message || 'No se pudo cancelar el pedido';
          Swal.fire('Error', msg, 'error');
        },
      });
    });
  }

  procesarPedido(id?: number | null): void {
    if (!id) return;

    Swal.fire({
      title: '¿Procesar pedido?',
      text: 'Se validarán existencias y se registrarán salidas de insumos.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, procesar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#0062BA',
      cancelButtonColor: '#6c757d',
    }).then((r) => {
      if (!r.isConfirmed) return;

      this.isAccionLoading = true;
      Swal.fire({
        title: 'Procesando...',
        html: 'Registrando salidas de insumos.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      this.ventasService.procesarPedido(id).subscribe({
        next: (res) => {
          this.isAccionLoading = false;
          Swal.close();
          Swal.fire(
            '¡Listo!',
            res?.message || 'Pedido procesado (En proceso).',
            'success'
          );
          this.cargarPedidos();
          // refresca modal
          if (this.pedidoSeleccionado)
            this.verPedido(this.pedidoSeleccionado.idPedido);
        },
        error: (err) => {
          this.isAccionLoading = false;
          Swal.close();
          const msg = err?.error?.message || 'Error al procesar el pedido';
          Swal.fire('Error', msg, 'error');
        },
      });
    });
  }

  finalizarPedido(id?: number | null): void {
    if (!id) return;

    Swal.fire({
      title: '¿Finalizar pedido?',
      text: 'El pedido está marcado como pagado y se cerrará definitivamente.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#0062BA',
      cancelButtonColor: '#6c757d',
    }).then((r) => {
      if (!r.isConfirmed) return;

      this.isAccionLoading = true;
      Swal.fire({
        title: 'Finalizando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      this.ventasService.finalizarPedido(id).subscribe({
        next: (res) => {
          this.isAccionLoading = false;
          Swal.close();
          Swal.fire(
            '¡Completado!',
            res?.message || 'Pedido finalizado correctamente',
            'success'
          );
          this.cargarPedidos();
          this.cerrarModalDetalle();
        },
        error: (err) => {
          this.isAccionLoading = false;
          Swal.close();
          const msg = err?.error?.message || 'Error al finalizar el pedido';
          Swal.fire('Error', msg, 'error');
        },
      });
    });
  }
}
