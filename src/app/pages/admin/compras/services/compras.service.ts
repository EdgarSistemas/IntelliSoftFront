import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  CompraResumen,
  CompraDetalle,
  CompraCreateRequest,
  InventariarCompraRequest,
  CompraDetalleItem
} from '../interface/compra.interface';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = `${environment.apiUrl}/compra`;

  constructor(private http: HttpClient) {}

  crearCompra(data: CompraCreateRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/create`, data);
  }

  cancelarCompra(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/cancel/${id}`, {});
  }

  obtenerCompras(): Observable<CompraResumen[]> {
    return this.http.get<CompraResumen[]>(`${this.apiUrl}/getAll`);
  }

  obtenerCompraPorId(id: number): Observable<CompraDetalle> {
    return this.http.get<CompraDetalle>(`${this.apiUrl}/getById/${id}`);
  }

  obtenerComprasNoInventariadas(): Observable<CompraResumen[]> {
    return this.http.get<CompraResumen[]>(`${this.apiUrl}/noInventariadas`);
  }

  obtenerDetalleParaInventario(id: number): Observable<CompraDetalleItem[]> {
    return this.http.get<CompraDetalleItem[]>(`${this.apiUrl}/detalleInventario/${id}`);
  }

  inventariarCompra(data: InventariarCompraRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/inventariar`, data);
  }
}