import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { ClienteRoutingModule } from "./cliente-routing.module";
import { ManualesComponent } from "./manuales/components/manuales/manuales.component";
import { ProductsComponent } from "./products/components/products/products.component";
import { ShopComponent } from "./shop/components/shop/shop.component";

@NgModule({
    declarations: [
    ManualesComponent,
    ProductsComponent,
    ShopComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ClienteRoutingModule
    ]
})
export class ClienteModule{}