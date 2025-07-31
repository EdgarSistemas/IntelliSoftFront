import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ComentariosComponent } from './comentarios/components/comentarios/comentarios.component';
import { ComprasComponent } from './compras/components/compras/compras.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ProductosComponent } from './productos/components/productos/productos.component';
import { ProveedorTableComponent } from './proveedores/components/proveedor-tabla/proveedor-tabla.component';
import { ProveedorFormularioComponent } from './proveedores/components/proveedor-formulario/proveedor-formulario.component';
import { UsersComponent } from './users/components/users/users.component';
import { VentasComponent } from './ventas/components/ventas/ventas.component';
import { LayoutComentariosComponent } from './comentarios/pages/layout-comentarios/layout-comentarios.component';
import { LayoutComprasComponent } from './compras/pages/layout-compras/layout-compras.component';
import { LayoutDashboardComponent } from './dashboard/pages/layout-dashboard/layout-dashboard.component';
import { LayoutProductosComponent } from './productos/pages/layout-productos/layout-productos.component';
import { LayoutProveedoresComponent } from './proveedores/pages/layout-proveedores/layout-proveedores.component';
import { LayoutUsersComponent } from './users/pages/layout-users/layout-users.component';
import { LayoutVentasComponent } from './ventas/pages/layout-ventas/layout-ventas.component';
import { NavbarAdminComponent } from "./home/pages/navbar-admin/navbar-admin.component";
import { FooterAdminComponent } from "./home/pages/footer-admin/footer-admin.component";
import { HeaderComponent } from './proveedores/components/proveedor-header/header/header.component';


@NgModule({
  declarations: [
    ComentariosComponent,
    ComprasComponent,
    DashboardComponent,
    ProductosComponent,
    ProveedorTableComponent,
    ProveedorFormularioComponent,
    HeaderComponent,
    UsersComponent,
    VentasComponent,
    LayoutComentariosComponent,
    LayoutComprasComponent,
    LayoutDashboardComponent,
    LayoutProductosComponent,
    LayoutProveedoresComponent,
    LayoutUsersComponent,
    LayoutVentasComponent,
    NavbarAdminComponent,
    FooterAdminComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    RouterOutlet,
    ReactiveFormsModule
]
})
export class AdminModule { }
