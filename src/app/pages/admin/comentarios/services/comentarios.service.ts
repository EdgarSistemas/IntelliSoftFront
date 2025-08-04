import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Comentarios } from '../interface/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

   constructor(private http: HttpClient) {}

  getComentarios(): Observable<Comentarios[]> {
    return this.http.get<Comentarios[]>(`${environment.apiUrl}/comentario/getall`);
  }
 
  eliminarComentario(idComentario: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/comentario/delete/${idComentario}`);
  }

  crearComentario(comentario: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(`${environment.apiUrl}/comentario/crear`, comentario);
  }


}
