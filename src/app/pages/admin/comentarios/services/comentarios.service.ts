import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { opiniones } from '../interface/opiniones';
import { Comentarios } from '../interface/comentarios';


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

   constructor(private http: HttpClient) {}

  getOpiniones(): Observable<opiniones[]> {
    return this.http.get<opiniones[]>(`${environment.apiUrl}/opinion/getall`);
  }
 
  eliminarComentario(idComentario: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/opinion/comentario/${idComentario}`);
  }

  crearComentario(comentario: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(`${environment.apiUrl}/opinion/comentar`, comentario);
  }

}
