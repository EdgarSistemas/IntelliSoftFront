import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../../login/services/auth.service';

@Component({
  selector: 'app-navbar-inicio',
  standalone:false,
  templateUrl: './navbar-inicio.component.html',
  styleUrl: './navbar-inicio.component.css'
})
export class NavbarInicioComponent {
  scrolled = false;
   @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = offset > 50; // Cambia 50 por el número de píxeles que prefieras
  }
constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
