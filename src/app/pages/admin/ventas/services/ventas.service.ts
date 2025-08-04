import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido, PedidoUpdateDto, PedidoDetalleDto } from '../interface/ventas';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl =  `${environment.apiUrl}/Pedido`;

  constructor(private http: HttpClient) {}

  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/getAll`);
  }

  getPedidoById(id: number): Observable<PedidoDetalleDto> {
    return this.http.get<PedidoDetalleDto>(`${this.apiUrl}/getById/${id}`);
  }

  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  actualizarEstatus(id: number, estatus: number): Observable<any> {
    const dto: PedidoUpdateDto = { estatus };
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, dto);
  }
}
