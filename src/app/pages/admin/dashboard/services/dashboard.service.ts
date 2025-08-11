import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Según la documentación: /api/dashboard (en minúsculas)
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  private buildParams(range?: { from?: string; to?: string; take?: number; metric?: string }): HttpParams {
    let params = new HttpParams();
    if (range?.from)  params = params.set('from', range.from);
    if (range?.to)    params = params.set('to', range.to);
    if (range?.take != null)   params = params.set('take', String(range.take));
    if (range?.metric) params = params.set('metric', range.metric);
    return params;
  }

  obtenerPedidosPorEstatus(range?: { from?: string; to?: string }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/pedidosEstatus`, { params });
  }

  obtenerIngresosMensuales(range?: { from?: string; to?: string }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/ingresos-mensuales`, { params });
  }

  obtenerPedidosMensuales(range?: { from?: string; to?: string }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/pedidos-mensuales`, { params });
  }

  obtenerTopProductos(range?: { from?: string; to?: string; take?: number; metric?: 'ingreso' | 'partidas' }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/top-productos`, { params });
  }

  obtenerClientesTop(range?: { from?: string; to?: string; take?: number }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/clientes-top`, { params });
  }

  obtenerConversion(range?: { from?: string; to?: string }): Observable<{ cotizaciones: number; pedidos: number; conversion: number }> {
    const params = this.buildParams(range);
    return this.http.get<{ cotizaciones: number; pedidos: number; conversion: number }>(`${this.apiUrl}/conversion`, { params });
  }

  obtenerProductosMejorCalificados(range?: { from?: string; to?: string; take?: number }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/mejorOpinion`, { params });
  }

  obtenerDistribucionOpiniones(range?: { from?: string; to?: string }): Observable<any[]> {
    const params = this.buildParams(range);
    return this.http.get<any[]>(`${this.apiUrl}/distribucion`, { params });
  }
}
