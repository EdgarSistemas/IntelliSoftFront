export interface CotizacionDetalle {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}

export interface Opinion {
  usuarioId?: string;
  productoId: number;
  calificacion: number;
  comentario: string;
  fecha?: Date;
  estatus?: number;
}

export interface PedidoResponse {
  idPedido: number;
  cotizacionId: number;
  cotizacionClave?: string | null;
  fechaPedido: string | null;
  estatus: number | null;

  clienteId: string | null;
  nombreCliente: string;
  comentario: string | null;

  partidas: Partida[];

  totalPrecioBase: number;
  totalGanancia: number;
  totalPrecioConGanancia: number;
  totalPrecioConRiesgo: number;
  total: number;
}

export interface Partida {
  cotizacionProductoId: number;
  productoId: number;
  nombreProducto: string | null;
  hectareas: number;

  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  aplicaRiesgo: number;

  detalles: Detalle[] | null;

  precioBase: number;
  ganancia: number;
  precioConGanancia: number;
  precioConRiesgo: number;
  total: number;
}

export interface Detalle {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}
