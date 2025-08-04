import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { ComentariosComponent } from './comentarios/components/comentarios/comentarios.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
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
import { VentasTableComponent } from './ventas/components/ventas-table/ventas-table.component';
import { ProductoTablaComponent } from './productos/components/producto-tabla/producto-tabla.component';
import { ProductoFormularioComponent } from './productos/components/producto-formulario/producto-formulario.component';
import { ProductoFormularioEditarComponent } from './productos/components/producto-formulario-editar/producto-formulario-editar.component';
import { CotizacionTablaComponent } from './cotizaciones/components/cotizacion-tabla/cotizacion-tabla.component';
import { LayoutComentariosComponent } from './comentarios/pages/layout-comentarios/layout-comentarios.component';
import { LayoutComprasComponent } from './compras/pages/layout-compras/layout-compras.component';
import { LayoutDashboardComponent } from './dashboard/pages/layout-dashboard/layout-dashboard.component';
import { LayoutProductosComponent } from './productos/pages/layout-productos/layout-productos.component';
import { LayoutProveedoresComponent } from './proveedores/pages/layout-proveedores/layout-proveedores.component';
import { LayoutUsersComponent } from './users/pages/layout-users/layout-users.component';
import { LayoutVentasComponent } from './ventas/pages/layout-ventas/layout-ventas.component';
import { LayoutUnidadesComponent } from './unidades/pages/layout-unidades/layout-unidades.component';
import { LayoutInsumosComponent } from './insumos/pages/layout-insumos/layout-insumos.component';
import { LayoutCotizacionesComponent } from './cotizaciones/pages/layout-cotizaciones/layout-cotizaciones.component';
import { NavbarAdminComponent } from "./home/pages/navbar-admin/navbar-admin.component";
import { FooterAdminComponent } from "./home/pages/footer-admin/footer-admin.component";
import { HeaderComponent } from './proveedores/components/proveedor-header/header/header.component';


@NgModule({
  declarations: [
    ComentariosComponent,
    DashboardComponent,
    ProveedorTableComponent,
    ProveedorFormularioComponent,
    HeaderComponent,
    UsersComponent,
    VentasComponent,
    UnidadFormularioComponent,
    UnidadTablaComponent,
    InsumoFormularioComponent,
    InsumoTablaComponent,
    CompraTablaComponent,
    CompraFormularioComponent,
    VentasTableComponent,
    ProductoTablaComponent,
    ProductoFormularioComponent,
    ProductoFormularioEditarComponent,
    CotizacionTablaComponent,
    LayoutComentariosComponent,
    LayoutComprasComponent,
    LayoutDashboardComponent,
    LayoutProductosComponent,
    LayoutProveedoresComponent,
    LayoutUsersComponent,
    LayoutVentasComponent,
    LayoutUnidadesComponent,
    LayoutInsumosComponent,
    LayoutCotizacionesComponent,
    NavbarAdminComponent,
    FooterAdminComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    DatePipe
  ]
})
export class AdminModule { }
