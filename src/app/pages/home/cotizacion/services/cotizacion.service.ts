import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = 'https://localhost:5000/api'; // Misma URL base

  constructor(private http: HttpClient) { }

  allProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/GetAll`);
  }

  enviarCotizacion(cotizacionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cotizacion/crear`, cotizacionData);
  }
}