import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//GLOBALES
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

//LOGIN/REGISTER
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

//HOME
import { AyudaComponent } from "./pages/home/ayuda/ayuda.component";
import { DocumentsComponent } from "./pages/home/documents/documents.component";
import { EmpresaComponent } from "./pages/home/empresa/empresa.component";
import { InicioComponent } from "./pages/home/inicio/inicio.component";

//CLIENTE
import { ManualesComponent } from "./pages/client/manuales/manuales.component";
import { ProductsComponent } from "./pages/client/products/products.component";
import { ShopComponent } from "./pages/client/shop/shop.component";

//ADMIN
import { ComentariosComponent } from "./pages/admin/comentarios/comentarios.component";
import { ComprasComponent } from "./pages/admin/compras/compras.component";
import { DashboardComponent } from "./pages/admin/dashboard/dashboard.component";
import { ProductosComponent } from "./pages/admin/productos/productos.component";
import { ProveedoresComponent } from "./pages/admin/proveedores/proveedores.component";
import { UsersComponent } from "./pages/admin/users/users.component";
import { VentasComponent } from "./pages/admin/ventas/ventas.component";
import { CotizacionComponent } from "./components/cotizacion/cotizacion.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

export function tokenGetter() {
    return localStorage.getItem('jwt');
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        AyudaComponent,
        DocumentsComponent,
        EmpresaComponent,
        InicioComponent,
        ManualesComponent,
        ProductsComponent,
        ShopComponent,
        ComentariosComponent,
        ComprasComponent,
        DashboardComponent,
        ProductosComponent,
        ProveedoresComponent,
        UsersComponent,
        VentasComponent,
        CotizacionComponent,
        ProfileComponent
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
    exports: [ NavbarComponent, FooterComponent],
    bootstrap: [ AppComponent]
})
export class AppModule{}