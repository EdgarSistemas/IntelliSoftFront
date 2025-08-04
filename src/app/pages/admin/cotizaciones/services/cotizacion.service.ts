import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CotizacionResumen,
  CotizacionDto,
  AceptarCotizacionDto,
  CotizacionEstadoUpdateDto
} from '../interface/cotizacion.interface'
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = `${environment.apiUrl}/Cotizacion`;

  constructor(private http: HttpClient) {}

  getResumenCotizaciones(): Observable<CotizacionResumen[]> {
    return this.http.get<CotizacionResumen[]>(`${this.apiUrl}/resumen`);
  }

  getCotizacionById(id: number): Observable<CotizacionDto> {
    return this.http.get<CotizacionDto>(`${this.apiUrl}/${id}`);
  }

  aceptarCotizacion(dto: AceptarCotizacionDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/aceptar`, dto);
  }

  cambiarEstado(dto: CotizacionEstadoUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/estado`, dto);
  }
}
