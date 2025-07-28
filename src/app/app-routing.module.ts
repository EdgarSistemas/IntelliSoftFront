//RUTAS
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//LOGIN
import { LoginComponent } from "./pages/login/components/login/login.component";
import { RegisterComponent } from "./pages/register/components/register/register.component";

//HOME
import { AyudaComponent } from "./pages/home/ayuda/components/ayuda/ayuda.component";
import { DocumentsComponent } from "./pages/home/documents/components/documents/documents.component";
import { EmpresaComponent } from "./pages/home/empresa/components/empresa/empresa.component";
import { InicioComponent } from "./pages/home/inicio/components/inicio/inicio.component";
import { CotizacionComponent } from "./pages/home/cotizacion/components/cotizacion/cotizacion.component";

const routes : Routes = [

    //RUTAS GENERALES SIN ESTAR LOGUEADOS
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'inicio', component: InicioComponent},
    { path: 'empresa', component: EmpresaComponent},
    { path: 'documentos', component: DocumentsComponent},
    { path: 'ayuda', component: AyudaComponent},
    { path: 'cotizacion', component: CotizacionComponent },

    {
        path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'cliente',
    loadChildren: () => import('./pages/client/cliente.module').then(m => m.ClienteModule)
    },
    

    { path: '', redirectTo: 'inicio', pathMatch: 'full'},
    { path: '**', redirectTo: 'inicio'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}