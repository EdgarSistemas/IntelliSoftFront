import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";


//SHARED
import { LayoutNavbarComponent } from "./shared/navbar/pages/layout-navbar/layout-navbar.component";
import { LayoutFooterComponent } from "./shared/footer/pages/layout-footer/layout-footer.component";
import { LayoutCotizacionComponent } from "./shared/cotizacion/pages/layout-cotizacion/layout-cotizacion.component";
import { LayoutProfileComponent } from "./shared/profile/pages/layout-profile/layout-profile.component";


//LOGIN/REGISTER
import { LayoutLoginComponent} from "./pages/login/pages/layout-login/layout-login.component";
import { LayoutRegisterComponent } from './pages/register/pages/layout-register/layout-register.component';


//HOME
import { LayoutAyudaComponent } from "./pages/home/ayuda/pages/layout-ayuda/layout-ayuda.component";
import { LayoutDocumentsComponent } from "./pages/home/documents/pages/layout-documents/layout-documents.component";
import { LayoutEmpresaComponent } from "./pages/home/empresa/pages/layout-empresa/layout-empresa.component";
import { LayoutInicioComponent } from "./pages/home/inicio/pages/layout-inicio/layout-inicio.component";

//CLIENTE
import { LayoutManualesComponent } from "./pages/client/manuales/pages/layout-manuales/layout-manuales.component";
import { LayoutProductsComponent } from "./pages/client/products/pages/layout-products/layout-products.component";
import { LayoutShopComponent } from "./pages/client/shop/pages/layout-shop/layout-shop.component";

//ADMIN
import { LayoutComentariosComponent } from "./pages/admin/comentarios/pages/layout-comentarios/layout-comentarios.component";
import { LayoutComprasComponent } from "./pages/admin/compras/pages/layout-compras/layout-compras.component";
import { LayoutDashboardComponent } from "./pages/admin/dashboard/pages/layout-dashboard/layout-dashboard.component";
import { LayoutProductosComponent } from "./pages/admin/productos/pages/layout-productos/layout-productos.component";
import { LayoutProveedoresComponent } from "./pages/admin/proveedores/pages/layout-proveedores/layout-proveedores.component";
import { LayoutUsersComponent } from "./pages/admin/users/pages/layout-users/layout-users.component";
import { LayoutVentasComponent } from "./pages/admin/ventas/pages/layout-ventas/layout-ventas.component";

export function tokenGetter() {
    return localStorage.getItem('jwt');
}

@NgModule({
    declarations: [
    LayoutNavbarComponent,
    LayoutFooterComponent,
    LayoutCotizacionComponent,
    LayoutProfileComponent,
    LayoutLoginComponent,
    LayoutRegisterComponent,
    LayoutAyudaComponent,
    LayoutDocumentsComponent,
    LayoutEmpresaComponent,
    LayoutInicioComponent,
    LayoutManualesComponent,
    LayoutProductsComponent,
    LayoutShopComponent,
    LayoutComentariosComponent,
    LayoutComprasComponent,
    LayoutDashboardComponent,
    LayoutProductosComponent,
    LayoutProveedoresComponent,
    LayoutUsersComponent,
    LayoutVentasComponent

    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
        config: {
        tokenGetter,
        allowedDomains: ['localhost:7031'],
        disallowedRoutes: ['localhost:7031/api/auth/login']
      }
    })
],
    exports: [ LayoutNavbarComponent, LayoutFooterComponent ],
    bootstrap: [ AppComponent]
})
export class AppModule{}