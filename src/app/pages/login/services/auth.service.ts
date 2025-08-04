import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginResponse } from '../interface/loginResponse.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:5000/api/auth'; // tu backend
  loading = false;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {}


 login(model: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, model).subscribe({
      next: (res) => {
        if (!res.token) {
          Swal.fire('Error', res.message || 'Error en autenticación', 'error');
          return;
        }
        this.loading = false;
        localStorage.setItem('token', res.token);
        const decoded = this.jwtHelper.decodeToken(res.token);
        // Extraer usuarioId del token (ajusta la clave según lo que viste en el console.log)
const usuarioId = decoded['sub']; // o 'id', o la clave real
if (usuarioId) {
  localStorage.setItem('usuarioId', usuarioId);
} else {
  console.warn('El token no contiene usuarioId');
}

        // Ya confirmamos con la imagen que esta clave funciona
        const rol = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        console.log('Token Decodificado (para depuración):', decoded);
        console.log('Rol extraído (para depuración):', rol);

        // Redirigir según el rol
        switch (rol) {
          case 'admin':
            console.log('Redirigiendo a /admin');
            this.router.navigate(['/admin'], { replaceUrl: true });
            break;
          case 'cliente':
            console.log('Redirigiendo a /cliente');
            this.router.navigate(['/cliente'], { replaceUrl: true });
            break;
          default:
            // Si el rol no es 'admin' ni 'cliente', o si el rol es nulo/indefinido,
            // lo tratamos como un usuario no reconocido (o con un rol por defecto).
            // Lo más lógico es llevarlo a una página de "inicio" o "dashboard" genérica
            // para usuarios autenticados pero sin roles específicos 'admin' o 'cliente'.
            // O, si no hay una página para "roles generales", puedes redirigirlo de nuevo al login o a un mensaje de error.
            console.warn('Rol no reconocido:', rol, 'Redirigiendo a /login o /inicio como fallback.');
            this.router.navigate(['/inicio'], { replaceUrl: true }

            ); // O a la ruta que consideres para roles por defecto / no reconocidos
            break;
        }
      },
     error: (err) => {
  console.error('Error de autenticación:', err);
this.loading = false;
  let errorMessage = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
  if (err.status === 401) {
    errorMessage = 'Usuario o contraseña incorrectos.';
  } else if (err.error && typeof err.error === 'string') {
    errorMessage = err.error;
  } else if (err.message) {
    errorMessage = `Ocurrió un error: ${err.message}`;
  }

  Swal.fire({
    icon: 'error',
    title: 'Error de inicio de sesión',
    text: errorMessage,
    confirmButtonColor: '#004aad',
    footer: '<a href="/forgot-password">¿Olvidaste tu contraseña?</a>'
  });

}

    });

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    console.log('Token después del logout:', localStorage.getItem('token')); // debe ser null
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRol(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
}
