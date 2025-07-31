import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../../guard/auth.guard";
import { RoleGuard } from "../../guard/role.guard";

 //RUTAS PARA ROL CLIENTE
import { LayoutManualesComponent } from './manuales/pages/layout-manuales/layout-manuales.component';
import { LayoutProductsComponent } from './products/pages/layout-products/layout-products.component';
import { LayoutShopComponent } from './shop/pages/layout-shop/layout-shop.component';
import { LayoutProfileComponent } from './profile/pages/layout-profile/layout-profile.component';
import { LayoutClientecotizacionComponent } from './cotizacion/pages/layout-clientecotizacion/layout-clientecotizacion.component';


   const routes: Routes= [
  {
    path: '',
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'cliente'},
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            { path: 'manuales', component: LayoutManualesComponent},
            { path: 'products', component: LayoutProductsComponent },
            { path: 'shop', component: LayoutShopComponent },
            { path: 'profile', component: LayoutProfileComponent},
            { path: 'cotizaciones', component: LayoutClientecotizacionComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule{}  
