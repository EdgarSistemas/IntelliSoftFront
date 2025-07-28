import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../../guard/auth.guard";
import { RoleGuard } from "../../guard/role.guard";

 //RUTAS PARA ROL CLIENTE
import { ManualesComponent } from "./manuales/components/manuales/manuales.component";
import { ProductsComponent } from "./products/components/products/products.component";
import { ShopComponent } from "./shop/components/shop/shop.component";
import { ProfileComponent } from "../../shared/profile/components/profile/profile.component";

   const routes: Routes= [
  {
    path: 'cliente',
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'cliente'},
        children: [
            { path: 'manuales', component: ManualesComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'shop', component: ShopComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule{}  
