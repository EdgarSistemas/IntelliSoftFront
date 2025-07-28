import { Component } from '@angular/core';
import { AuthService } from '../../../../login/services/auth.service';

@Component({
  selector: 'app-navbar-inicio',
  standalone:false,
  templateUrl: './navbar-inicio.component.html',
  styleUrl: './navbar-inicio.component.css'
})
export class NavbarInicioComponent {
constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
