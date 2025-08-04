import { Unidad, UnidadCreateDto } from './../interface/unidad.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = `${environment.apiUrl}/Unidad`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.apiUrl}/GetById/${id}`);
  }

  create(unidad: UnidadCreateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, unidad);
  }

  update(id: number, unidad: UnidadCreateDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/${id}`, unidad);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }
}
