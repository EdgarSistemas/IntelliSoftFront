export interface Unidad {
  idUnidad: number;
  nombre: string;
  simbolo: string;
  descripcion: string;
  estatus: number;
}

export interface UnidadCreateDto {
  nombre: string;
  simbolo: string;
  descripcion: string;
}
