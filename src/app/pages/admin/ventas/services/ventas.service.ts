import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PedidoResponse } from '../interface/ventas';

@Injectable({ providedIn: 'root' })
export class VentasService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  getAllPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}`);
  }

  getPedidoById(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.apiUrl}/${id}`);
  }

  cancelarPedido(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }

  procesarPedido(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/procesar`, {});
  }

  finalizarPedido(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/finalizar`, {});
  }

  getPedidosCliente(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/cliente`);
  }
}
