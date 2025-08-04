export interface CotizacionResumen {
  idCotizacion: number;
  claveCotizacion: string;
  nombreCliente: string;
  hectareas: number;
  estadoSolicitud: number;
  fechaSolicitud: string;
  total: number;
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
  usuarioId: string;
}

export interface CotizacionEstadoUpdateDto {
  idCotizacion: number;
  nuevoEstado: number;
}
