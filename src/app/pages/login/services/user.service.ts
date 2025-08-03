import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(){
    //Obtener el token del LocalStorage
    const token = localStorage.getItem('token');

    //Configurar headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://localhost:5000/api/Auth/detail', {headers});
  }
}
