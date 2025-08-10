import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CotizacionResumenApi,
  CotizacionFull,
  AceptarCotizacionDto,
  CotizacionEstadoUpdateDto,
  EnviarPdfDto
} from '../interface/cotizacion.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  private apiUrl = `${environment.apiUrl}/Cotizacion`;

  constructor(private http: HttpClient) {}

  getResumenCotizaciones(): Observable<CotizacionResumenApi[]> {
    return this.http.get<CotizacionResumenApi[]>(`${this.apiUrl}/resumen`);
  }

  getCotizacionById(id: number): Observable<CotizacionFull> {
    return this.http.get<CotizacionFull>(`${this.apiUrl}/${id}`);
  }

  aceptarCotizacion(dto: AceptarCotizacionDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/aceptar`, dto);
  }

  cambiarEstado(dto: CotizacionEstadoUpdateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/estado`, dto);
  }

  enviarPdf(dto: EnviarPdfDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cotizacion/enviar-pdf`, dto);
  }

  descargarPdf(idCotizacion: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiUrl}/cotizacion/pdf/${idCotizacion}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
