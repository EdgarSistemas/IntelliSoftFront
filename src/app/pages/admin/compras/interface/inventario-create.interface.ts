export interface InventariarCompraDto {
  compraId: number;
  insumosInventariados: InsumoInventariadoDto[];
}

export interface InsumoInventariadoDto {
  insumoId: number;
  cantidadUnidad: number;
  costoUnitario: number;
}