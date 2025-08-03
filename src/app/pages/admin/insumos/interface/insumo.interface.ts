import { Unidad } from './../../unidades/interface/unidad.interface';

export interface Insumo {
  idInsumo: number;
  nombre: string;
  descripcion: string;
  unidadId: number;
  unidad: Unidad;
  estatus: number;
  existencias: number;
  precioPromedio: number;
}

export interface InsumoCreate {
  nombre: string;
  descripcion: string;
  unidadId: number;
}

export interface InsumoUpdate {
  nombre: string;
  descripcion: string;
}
