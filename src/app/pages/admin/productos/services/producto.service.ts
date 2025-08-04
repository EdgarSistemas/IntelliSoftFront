import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  ProductoResumen,
  ProductoDetalle,
  ProductoCreateRequest
} from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/producto`;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<ProductoResumen[]> {
    return this.http.get<ProductoResumen[]>(`${this.apiUrl}/GetAll`);
  }

  obtenerProductoPorId(id: number): Observable<ProductoDetalle> {
    return this.http.get<ProductoDetalle>(`${this.apiUrl}/GetById/${id}`);
  }

  crearProducto(data: ProductoCreateRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/Create`, data);
  }

  actualizarProducto(id: number, data: ProductoCreateRequest): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/Update/${id}`, data);
  }

  eliminarProducto(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/Delete/${id}`);
  }
}
