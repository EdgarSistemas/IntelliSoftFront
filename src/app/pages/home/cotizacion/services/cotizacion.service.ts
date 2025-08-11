import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearCotizacionRequest, CrearCotizacionResponse } from '../interface/cotizacion'


@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private apiUrl = 'https://localhost:5000/api'; // Misma URL base

  constructor(private http: HttpClient) {}

  allProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/GetAll`);
  }

  crearCotizacionMultiple(payload: CrearCotizacionRequest): Observable<CrearCotizacionResponse> {
    return this.http.post<CrearCotizacionResponse>(`${this.apiUrl}/cotizacion/crear`, payload);
  }
}
