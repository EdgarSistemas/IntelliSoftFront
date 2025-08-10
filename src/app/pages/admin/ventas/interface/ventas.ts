export interface PedidoResponse {
  idPedido: number;
  cotizacionId: number;
  cotizacionClave: string;
  fechaPedido: string | null;
  estatus: number | null;

  clienteId: string | null;
  nombreCliente: string;
  comentario: string | null;

  partidas: CotizacionPartidaDto[];

  totalPrecioBase: number;
  totalGanancia: number;
  totalPrecioConGanancia: number;
  totalPrecioConRiesgo: number;
  total: number;
}

export interface CotizacionPartidaDto {
  cotizacionProductoId: number;
  productoId: number;
  nombreProducto: string | null;
  hectareas: number;

  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  aplicaRiesgo: number;

  detalles: CotizacionProductoDetalleDto[] | null;

  precioBase: number;
  ganancia: number;
  precioConGanancia: number;
  precioConRiesgo: number;
  total: number;
}

export interface CotizacionProductoDetalleDto {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}

export interface DetalleInsumoPlano {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}
