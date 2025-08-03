import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ComentariosComponent } from './comentarios/components/comentarios/comentarios.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { ProductosComponent } from './productos/components/productos/productos.component';
import { ProveedorTableComponent } from './proveedores/components/proveedor-tabla/proveedor-tabla.component';
import { ProveedorFormularioComponent } from './proveedores/components/proveedor-formulario/proveedor-formulario.component';
import { UsersComponent } from './users/components/users/users.component';
import { VentasComponent } from './ventas/components/ventas/ventas.component';
import { UnidadFormularioComponent } from './unidades/components/unidad-formulario/unidad-formulario.component';
import { UnidadTablaComponent } from './unidades/components/unidad-tabla/unidad-tabla.component';
import { InsumoFormularioComponent } from './insumos/components/insumo-formulario/insumo-formulario.component';
import { InsumoTablaComponent } from './insumos/components/insumo-tabla/insumo-tabla.component';
import { CompraTablaComponent } from './compras/components/compra-tabla/compra-tabla.component';
import { CompraFormularioComponent } from './compras/components/compra-formulario/compra-formulario.component';
import { LayoutComentariosComponent } from './comentarios/pages/layout-comentarios/layout-comentarios.component';
import { LayoutComprasComponent } from './compras/pages/layout-compras/layout-compras.component';
import { LayoutDashboardComponent } from './dashboard/pages/layout-dashboard/layout-dashboard.component';
import { LayoutProductosComponent } from './productos/pages/layout-productos/layout-productos.component';
import { LayoutProveedoresComponent } from './proveedores/pages/layout-proveedores/layout-proveedores.component';
import { LayoutUsersComponent } from './users/pages/layout-users/layout-users.component';
import { LayoutVentasComponent } from './ventas/pages/layout-ventas/layout-ventas.component';
import { LayoutUnidadesComponent } from './unidades/pages/layout-unidades/layout-unidades.component';
import { LayoutInsumosComponent } from './insumos/pages/layout-insumos/layout-insumos.component';
import { NavbarAdminComponent } from "./home/pages/navbar-admin/navbar-admin.component";
import { FooterAdminComponent } from "./home/pages/footer-admin/footer-admin.component";
import { HeaderComponent } from './proveedores/components/proveedor-header/header/header.component';



@NgModule({
  declarations: [
    ComentariosComponent,
    DashboardComponent,
    ProductosComponent,
    ProveedorTableComponent,
    ProveedorFormularioComponent,
    HeaderComponent,
    UsersComponent,
    VentasComponent,
    UnidadFormularioComponent,
    UnidadTablaComponent,
    InsumoFormularioComponent,
    InsumoTablaComponent,
    CompraFormularioComponent,
    CompraTablaComponent,
    LayoutComentariosComponent,
    LayoutComprasComponent,
    LayoutDashboardComponent,
    LayoutProductosComponent,
    LayoutProveedoresComponent,
    LayoutUsersComponent,
    LayoutVentasComponent,
    LayoutUnidadesComponent,
    LayoutInsumosComponent,
    NavbarAdminComponent,
    FooterAdminComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule
]
})
export class AdminModule { }
