import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PedidoResponse, Opinion } from '../interface/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl =  `${environment.apiUrl}/pedidos`;
  private apiUrlO =  `${environment.apiUrl}/Opinion`;
  constructor(private http: HttpClient) {}

  getPedidosPorUsuario(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/cliente`);
  }

  marcarPagado(idPedido: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idPedido}/pagado`, {});
  }

  crearOpinion(opinion: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(`${this.apiUrlO}/create`, opinion);
  }
}
