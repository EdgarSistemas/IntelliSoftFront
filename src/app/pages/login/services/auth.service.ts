import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  private baseUrl = 'https://localhost:7259/api/auth'; // tu backend

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {}

 login(model: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, model).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        const decoded = this.jwtHelper.decodeToken(res.token);

        // Ya confirmamos con la imagen que esta clave funciona
        const rol = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        console.log('Token Decodificado (para depuración):', decoded);
        console.log('Rol extraído (para depuración):', rol);

        // Redirigir según el rol
        switch (rol) {
          case 'admin':
            console.log('Redirigiendo a /admin');
            this.router.navigate(['/admin']);
            break;
          case 'cliente':
            console.log('Redirigiendo a /cliente');
            this.router.navigate(['/cliente']);
            break;
          default:
            // Si el rol no es 'admin' ni 'cliente', o si el rol es nulo/indefinido,
            // lo tratamos como un usuario no reconocido (o con un rol por defecto).
            // Lo más lógico es llevarlo a una página de "inicio" o "dashboard" genérica
            // para usuarios autenticados pero sin roles específicos 'admin' o 'cliente'.
            // O, si no hay una página para "roles generales", puedes redirigirlo de nuevo al login o a un mensaje de error.
            console.warn('Rol no reconocido:', rol, 'Redirigiendo a /login o /inicio como fallback.');
            this.router.navigate(['/inicio']); // O a la ruta que consideres para roles por defecto / no reconocidos
            break;
        }
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
        // Mejorar el mensaje de error para el usuario
        let errorMessage = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
        if (err.status === 401) {
          errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (err.error && typeof err.error === 'string') {
          // Si el backend envía un string de error, por ejemplo, "El usuario ya existe"
          errorMessage = err.error;
        } else if (err.message) {
          errorMessage = `Ocurrió un error: ${err.message}`;
        }
        alert(errorMessage);
      }
    });
  }

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  console.log('Token después del logout:', localStorage.getItem('token')); // debe ser null
  this.router.navigate(['/login']);
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
