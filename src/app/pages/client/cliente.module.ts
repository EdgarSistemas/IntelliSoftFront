import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ClienteRoutingModule } from "./cliente-routing.module";
import { ManualesComponent } from "./manuales/components/manuales/manuales.component";
import { ProductsComponent } from "./products/components/products/products.component";
import { ShopComponent } from "./shop/components/shop/shop.component";
import { NavbarClienteComponent } from "./home/navbar/navbar-cliente/navbar-cliente.component";
import { LayoutManualesComponent } from "./manuales/pages/layout-manuales/layout-manuales.component";
import { FooterClienteComponent } from "./home/footer/footer-cliente/footer-cliente.component";
import { LayoutProductsComponent } from "./products/pages/layout-products/layout-products.component";
import { LayoutShopComponent } from "./shop/pages/layout-shop/layout-shop.component";
import { ProfileComponent } from "./profile/components/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutProfileComponent } from "./profile/pages/layout-profile/layout-profile.component";
import { LayoutClientecotizacionComponent } from "./cotizacion/pages/layout-clientecotizacion/layout-clientecotizacion.component";
import { ClienteCotizacionComponent } from './cotizacion/components/cliente-cotizacion/cliente-cotizacion.component';



@NgModule({
    declarations: [
    ManualesComponent,
    ProductsComponent,
    ShopComponent,
    ProfileComponent,
    ClienteCotizacionComponent,
    LayoutManualesComponent,
    LayoutProductsComponent,
    LayoutShopComponent,
    LayoutClientecotizacionComponent,
    LayoutProfileComponent,
    NavbarClienteComponent,
    FooterClienteComponent,
  
    ],
    imports: [
    CommonModule,
    RouterModule,
    ClienteRoutingModule, 
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
],
})
export class ClienteModule{}