import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../guard/auth.guard";
import { RoleGuard } from "../../guard/role.guard";


//ADMIN

import { LayoutProveedoresComponent } from "./proveedores/pages/layout-proveedores/layout-proveedores.component";
import { LayoutComentariosComponent } from "./comentarios/pages/layout-comentarios/layout-comentarios.component";
import { LayoutComprasComponent } from "./compras/pages/layout-compras/layout-compras.component";
import { LayoutDashboardComponent } from "./dashboard/pages/layout-dashboard/layout-dashboard.component";
import { LayoutProductosComponent } from "./productos/pages/layout-productos/layout-productos.component";
import { LayoutUsersComponent } from "./users/pages/layout-users/layout-users.component";
import { LayoutVentasComponent } from "./ventas/pages/layout-ventas/layout-ventas.component";
import { LayoutUnidadesComponent } from "./unidades/pages/layout-unidades/layout-unidades.component";
import { LayoutInsumosComponent } from "./insumos/pages/layout-insumos/layout-insumos.component";


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path: 'unidades', component: LayoutUnidadesComponent},
      {path: 'insumos', component: LayoutInsumosComponent},
      { path: 'proveedores', component: LayoutProveedoresComponent },
      { path: 'compras', component: LayoutComprasComponent},
      { path: 'productos', component: LayoutProductosComponent },
      { path: 'comentarios', component: LayoutComentariosComponent },
      { path: 'dashboard', component: LayoutDashboardComponent },
      { path: 'users', component: LayoutUsersComponent },
      { path: 'ventas', component: LayoutVentasComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule{}
