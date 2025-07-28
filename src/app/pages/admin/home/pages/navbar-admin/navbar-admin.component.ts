import { Component } from '@angular/core';
import { AuthService } from '../../../../login/services/auth.service';
import { AdminRoutingModule } from "../../../admin-routing.module";

@Component({
  selector: 'app-navbar-admin',
  imports: [AdminRoutingModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
