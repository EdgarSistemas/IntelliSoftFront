export interface CotizacionResumenApi {
  idCotizacion: number;
  claveCotizacion: string | null;
  usuarioId: string | null;
  estatus: number;
  fechaSolicitud: string | null;
  partidas: CotizacionResumenPartidaApi[];
  totalCotizacion: number;
}

export interface CotizacionResumenPartidaApi {
  idCotizacion: number;
  claveCotizacion: string | null;
  fechaSolicitud: string | null;
  estatus: number;
  cotizacionProductoId: number;
  productoId: number;
  nombreProducto: string | null;
  hectareas: number;
  nombreCliente: string | null;
  precioBase: number;
  ganancia: number;
  precioConGanancia: number;
  precioConRiesgo: number;
  total: number;
  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  aplicaRiesgo: number;
}

export interface CotizacionResumen {
  idCotizacion: number;
  claveCotizacion: string;
  nombreCliente: string;
  hectareas: number;
  estadoSolicitud: number;
  fechaSolicitud: string;
  total: number;
  ganancia: number;
  precioBase: number;
  precioConGanancia: number;
  precioConRiesgo: number;
}

export interface CotizacionDetalle {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}

export interface CotizacionDto {
  idCotizacion: number;
  claveCotizacion: string;
  productoId: number;
  usuarioId: string;
  hectareas: number;
  estadoSolicitud: number;
  fechaSolicitud: string;
  precioBase: number;
  precioConGanancia: number;
  precioConRiesgo: number;
  detalles: CotizacionDetalle[];
  total: number;
}

export interface AceptarCotizacionDto {
  idCotizacion: number;
}

export interface CotizacionEstadoUpdateDto {
  idCotizacion: number;
  nuevoEstado: number;
}

// === GET BY ID: header + partidas[] + detalles[] ===
export interface CotizacionFull {
  idCotizacion: number;
  claveCotizacion: string | null;
  usuarioId: string | null;
  nombreCliente: string | null;
  estatus: number;
  fechaSolicitud: string | null;
  detalleCotizacion: string | null;

  partidas: CotizacionPartida[];

  totalPrecioBase: number;
  totalGanancia: number;
  totalPrecioConGanancia: number;
  totalPrecioConRiesgo: number;
  total: number;
}

export interface CotizacionPartida {
  cotizacionProductoId: number;
  productoId: number;
  nombreProducto: string | null;

  hectareas: number;
  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  aplicaRiesgo: number;

  detalles: CotizacionProductoDetalle[];

  precioBase: number;
  ganancia: number;
  precioConGanancia: number;
  precioConRiesgo: number;
  total: number;
}

export interface CotizacionProductoDetalle {
  insumoId: number;
  nombreInsumo: string;
  cantidad: number;
  precioPromedio: number;
  subtotal: number;
}

export interface EnviarPdfDto {
  idCotizacion: number;
  destinatario?: string;
  asunto?: string;
  cuerpoHtml?: string;
}
