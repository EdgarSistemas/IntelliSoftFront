import { Insumo, InsumoCreate, InsumoUpdate } from './../interface/insumo.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private apiUrl = `${environment.apiUrl}/Insumo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<Insumo> {
    return this.http.get<Insumo>(`${this.apiUrl}/GetById/${id}`);
  }

  create(insumo: InsumoCreate): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, insumo);
  }

  update(id: number, insumo: InsumoUpdate): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/${id}`, insumo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete${id}`);
  }
}
