export interface CompraCreateRequest {
  proveedorId: number;
  observacion: string;
  detalles: CompraDetalleCreateRequest[];
}

export interface CompraDetalleCreateRequest {
  insumoId: number;
  presentacion: string;
  precioUnitario: number;
  cantidad: number;
}