//RUTAS
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//LOGIN
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

//HOME
import { AyudaComponent } from "./pages/home/ayuda/ayuda.component";
import { DocumentsComponent } from "./pages/home/documents/documents.component";
import { EmpresaComponent } from './pages/home/empresa/empresa.component';
import { InicioComponent } from "./pages/home/inicio/inicio.component";

//CLIENTE
import { ManualesComponent } from "./pages/client/manuales/manuales.component";
import { ProductsComponent } from "./pages/client/products/products.component";
import { ShopComponent } from './pages/client/shop/shop.component';

//ADMIN
import { ComentariosComponent } from "./pages/admin/comentarios/comentarios.component";
import { ComprasComponent } from "./pages/admin/compras/compras.component";
import { DashboardComponent } from "./pages/admin/dashboard/dashboard.component";
import { ProductosComponent } from "./pages/admin/productos/productos.component";
import { ProveedoresComponent } from "./pages/admin/proveedores/proveedores.component";
import { UsersComponent } from "./pages/admin/users/users.component";
import { VentasComponent } from "./pages/admin/ventas/ventas.component";

//COMPONENTES GLOBALES
import { CotizacionComponent } from "./components/cotizacion/cotizacion.component";
import { ProfileComponent} from "./components/profile/profile.component";
import { authGuard } from "./guard/auth.guard";
import { roleGuard } from "./guard/role.guard";




const routes : Routes = [

    //RUTAS GENERALES SIN ESTAR LOGUEADOS
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'inicio', component: InicioComponent},
    { path: 'empresa', component: EmpresaComponent},
    { path: 'documentos', component: DocumentsComponent},
    { path: 'ayuda', component: AyudaComponent},
    { path: 'cotizacion', component: CotizacionComponent},
    
    //RUTAS PARA ROL ADMIN
    {
        path: 'admin',
        canActivate:[authGuard, roleGuard],
        data: { expectedRole: 'admin'},
        children: [
            { path: 'comentarios', component: ComentariosComponent },
            { path: 'compras', component: ComprasComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'productos', component: ProductosComponent },
            { path: 'proveedores', component: ProveedoresComponent },
            { path: 'users', component: UsersComponent },
            { path: 'ventas', component: VentasComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    },

    //RUTAS PARA ROL CLIENTE
    {
        path: 'cliente',
        canActivate: [ authGuard, roleGuard],
        data: { expectedRole: 'cliente'},
        children: [
            { path: 'manuales', component: ManualesComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'shop', component: ShopComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    },
    { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    { path: '**', redirectTo: 'inicio'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}