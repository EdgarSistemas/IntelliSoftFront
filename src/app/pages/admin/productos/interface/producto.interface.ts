export interface ProductoResumen {
  idProductos: number;
  nombre: string;
  descripcion: string;
  precioActual: number;
  hectareaBase: number;
  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  precioCosto: number;
  precioConGanancia: number;
  precioConRiesgo: number;
}

export interface ProductoDetalle extends ProductoResumen {
  insumos: ProductoInsumoDetalle[];
}

export interface ProductoInsumoDetalle {
  insumoId: number;
  nombre: string;
  cantidad: number;
  precioPromedio: number;
  unidad: Unidad;
}

export interface Unidad {
  idUnidad: number;
  nombre: string;
  simbolo: string;
  descripcion: string;
  estatus: number;
}

export interface ProductoCreateRequest {
  nombre: string;
  descripcion: string;
  hectareaBase: number;
  porcentajeGanancia: number;
  porcentajeRiesgo: number;
  insumos: ProductoInsumoCreate[];
}

export interface ProductoInsumoCreate {
  insumoId: number;
  cantidad: number;
}