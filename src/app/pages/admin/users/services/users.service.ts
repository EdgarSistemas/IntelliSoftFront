import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interface/users';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

private apiUrl = 'https://localhost:5000/api'; 
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/auth/users`);
  }
  deleteUser(id: string): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/auth/delete/${id}`);
  }

editarUser(datos: { id: string; email: string; password: string }): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/auth/editar/`, datos);
}
}
