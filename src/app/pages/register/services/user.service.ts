import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// === Interfaces tipadas para reuso ===
export interface RegistrarAnonimoPayload {
  id?: string;           // el backend lo ignora/autoasigna, pero lo dejamos opcional
  nombre?: string;
  apellidos?: string;
  email: string;
  password?: string;     // vacío para anónimo
  rol?: string;          // vacío para anónimo
}

export interface UsuarioMin {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  rol: 'anonimo' | 'cliente' | 'admin' | string;
}

export interface RegistrarAnonimoResp {
  creado: boolean;
  usuario: UsuarioMin | null;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  /**
   * (Legacy) Registro de cliente 'anónimo' – preferir usar registrarOVerificarAnonimo()
   */
  registrarUsuario(userData: RegistrarAnonimoPayload): Observable<RegistrarAnonimoResp> {
    const payload: RegistrarAnonimoPayload = {
      id: userData.id ?? '',
      nombre: userData.nombre ?? '',
      apellidos: userData.apellidos ?? '',
      email: userData.email,
      password: userData.password ?? '',
      rol: userData.rol ?? ''
    };

    return this.http.post<RegistrarAnonimoResp>(
      `${this.apiUrl}/auth/anonimo-verificar-o-crear`,
      payload
    );
  }

  /**
   * Verifica si existe un usuario anónimo con ese email o lo crea.
   * - Si ya existe y NO es anónimo -> usuario: null, creado: false, message: "El usuario ya existe pero no es anónimo"
   * - Si existe y es anónimo -> usuario con datos, creado: false, message: "Usuario anónimo existente"
   * - Si no existe -> usuario con datos, creado: true
   */
  registrarOVerificarAnonimo(userData: { email: string; nombre?: string; apellidos?: string }): Observable<RegistrarAnonimoResp> {
    const payload: RegistrarAnonimoPayload = {
      id: '',
      nombre: userData.nombre ?? '',
      apellidos: userData.apellidos ?? '',
      email: userData.email,
      password: '',
      rol: ''
    };

    return this.http.post<RegistrarAnonimoResp>(
      `${this.apiUrl}/auth/anonimo-verificar-o-crear`,
      payload
    );
  }

  /**
   * Registro de cliente “formal” (no anónimo).
   * Ajusta el tipo si tienes un DTO específico para este endpoint.
   */
  registrarCliente(userData: {
    nombre: string;
    apellidos?: string;
    email: string;
    password: string;
    rol?: string; // p.ej. 'cliente'
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }
}
