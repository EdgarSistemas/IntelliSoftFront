import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../../login/services/auth.service';

@Component({
  selector: 'app-navbar-cliente',
   standalone:false,
  templateUrl: './navbar-cliente.component.html',
  styleUrl: './navbar-cliente.component.css'
})
export class NavbarClienteComponent {
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
