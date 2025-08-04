import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/Dashboard`;
  
  constructor(private http: HttpClient) {}

  obtenerPedidosPorEstatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pedidosEstatus`);
  }

  obtenerProductosMasVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/masVendidos`);
  }

  obtenerProductosMejorCalificados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mejorOpinion`);
  }

  obtenerDistribucionOpiniones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/distribucion`);
  }
}
