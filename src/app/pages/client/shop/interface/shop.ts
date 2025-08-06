export interface PedidoResponse {
  idPedido: number;
  cotizacionId: number;
  fechaPedido: string;
  clienteId: string;
  nombreCliente: string;
  comentario: string;
  estatus: number;
  productoId: number;
  nombreProducto: string;
  porcentajeGanancia: number;
  detalles: CotizacionDetalle[];
}

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