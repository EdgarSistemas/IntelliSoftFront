import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../../login/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: false,
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
scrolled = false;
   @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = offset > 50;
  }
constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
