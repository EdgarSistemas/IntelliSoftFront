import { Proveedor } from "../../proveedores/interface/proveedor.interface";
import { Unidad } from "../../unidades/interface/unidad.interface";

export interface CompraResumen {
  idCompra: number;
  claveCompra: string;
  fechaCompra: string;
  observacion: string;
  estatus: number;
  proveedorNombre?: string;
  total: number;
  proveedor: Proveedor;
}

export interface CompraDetalle {
  idCompra: number;
  claveCompra: string;
  fechaCompra: string;
  observacion: string;
  estatus: number;
  proveedor: Proveedor;
  detalles: CompraDetalleItem[];
}

export interface CompraDetalleItem {
  idCompraDetalle: number;
  insumoId: number;
  insumoNombre: string;
  presentacion: string;
  precioUnitario: number;
  cantidad: number;
  unidad: Unidad;
}

export interface CompraDetalleCreate {
  insumoId: number;
  presentacion: string;
  precioUnitario: number;
  cantidad: number;
}

export interface CompraCreateRequest {
  proveedorId: number;
  observacion: string;
  detalles: CompraDetalleCreate[];
}

export interface InsumoInventariado {
  insumoId: number;
  cantidadUnidad: number;
  costoUnitario: number;
}

export interface InventariarCompraRequest {
  compraId: number;
  insumosInventariados: InsumoInventariado[];
}