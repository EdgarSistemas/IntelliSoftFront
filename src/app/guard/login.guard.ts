import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../pages/login/services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      const rol = this.auth.getRol();

      if (rol === 'admin') {
        this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
      } else if (rol === 'cliente') {
        this.router.navigate(['/cliente/dashboard'], { replaceUrl: true });
      } else {
        this.router.navigate(['/inicio'], { replaceUrl: true });
      }

      return false;
    }
    return true;
  }
}
  