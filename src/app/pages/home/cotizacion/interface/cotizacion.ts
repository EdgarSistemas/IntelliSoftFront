export interface Cotizacion {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  plantType: string;
  hectares: number | null;
  activePonds: string;
  currentSystem: string;
  additionalDetails: string;
}

export interface CrearCotizacionRequest {
  usuarioId: string;
  detalleCotizacion: string;
  partidas: {
    productoId: number;
    hectareas: number;
  }[];
}

export interface CrearCotizacionResponse {
  ok?: boolean;
  success?: boolean;
  idCotizacion?: number;
  claveCotizacion?: string;
  message?: string;
}
