export interface Documento {
  idDocumento: number;
  nombreDocumento: string;
  url: string;
}

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  documentos: Documento[];
}
