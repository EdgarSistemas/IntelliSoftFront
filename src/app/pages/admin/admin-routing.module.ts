import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../guard/auth.guard";
import { RoleGuard } from "../../guard/role.guard";


//ADMIN
import { ComentariosComponent } from "./comentarios/components/comentarios/comentarios.component";
import { ComprasComponent } from "./compras/components/compras/compras.component";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { ProductosComponent } from "./productos/components/productos/productos.component";
import { ProveedoresComponent } from "./proveedores/components/proveedores/proveedores.component";
import { UsersComponent } from "./users/components/users/users.component";
import { VentasComponent } from "./ventas/components/ventas/ventas.component";
import { ProfileComponent } from "../../shared/profile/components/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'comentarios', component: ComentariosComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'users', component: UsersComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule{}