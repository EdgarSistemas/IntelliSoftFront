import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'https://localhost:5000/api'; 

  constructor( private http: HttpClient) { }

    // Endpoint para registro de cliente 'anonimo'
  registrarUsuario(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/anonimo-verificar-o-crear`, userData);
  }

registrarOVerificarAnonimo(userData: {email: string, nombre?: string, apellidos?: string}): Observable<{creado: boolean, usuario: {id: string | null}, message: string}> {
  const payload = {
    nombre: userData.nombre || '',
    apellidos: userData.apellidos || '',
    email: userData.email,
    password: '',
    rol: ''
  };

  return this.http.post<{creado: boolean, usuario: {id: string | null}, message: string}>(
    `${this.apiUrl}/auth/anonimo-verificar-o-crear`, 
    payload
  );
}
  
  // Endpoint para registro de cliente
  registrarCliente(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }
}


