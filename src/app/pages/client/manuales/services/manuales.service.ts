import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Documento, Producto } from '../interface/manuales';


@Injectable({
  providedIn: 'root'
})
export class ManualesService {

  private apiUrl =  `${environment.apiUrl}/Producto`;

  constructor(private http: HttpClient) {}

  obtenerDocumentos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/documentos`);
  }
}
