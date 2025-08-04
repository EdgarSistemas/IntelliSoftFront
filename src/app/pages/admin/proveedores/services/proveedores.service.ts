import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../interface/proveedor.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `${environment.apiUrl}/Proveedores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/getAll`);
  }

  getById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/getById/${id}`);
  }

  create(proveedor: Proveedor): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, proveedor);
  }

  update(id: number, proveedor: Partial<Proveedor>): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, proveedor);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
