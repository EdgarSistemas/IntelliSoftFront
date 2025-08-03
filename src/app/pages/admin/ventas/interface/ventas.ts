export interface Pedido {
  idPedido: number;
  cotizacionId: number;
  cantidad: number;
  precioUnitario: number;
  fechaPedido: string;
  estatus: number;
  comentario: string;
  nombreCliente: string;
  cotizacion?: any; 
}

export interface PedidoUpdateDto {
  estatus: number;
}

export interface PedidoDetalleDto {
  idPedido: number;
  cotizacionId: number;
  fechaPedido: string;
  estatus: number;
  clienteId: string;
  nombreCliente: string;
  comentario: string;
  detalles: DetalleInsumo[];
}

export interface DetalleInsumo {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}
