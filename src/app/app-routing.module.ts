//RUTAS
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

//LOGIN
import { LoginComponent } from './pages/login/components/login/login.component';
import { RegisterComponent } from './pages/register/components/register/register.component';

//HOME
import { AyudaComponent } from './pages/home/ayuda/components/ayuda/ayuda.component';
import { DocumentsComponent } from './pages/home/documents/components/documents/documents.component';
import { EmpresaComponent } from './pages/home/empresa/components/empresa/empresa.component';
import { InicioComponent } from './pages/home/inicio/components/inicio/inicio.component';
import { CotizacionComponent } from './pages/home/cotizacion/components/cotizacion/cotizacion.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  //RUTAS GENERALES SIN ESTAR LOGUEADOS
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [LoginGuard] },
  { path: 'empresa', component: EmpresaComponent, canActivate: [LoginGuard] },
  { path: 'documentos', component: DocumentsComponent, canActivate: [LoginGuard] },
  { path: 'ayuda', component: AyudaComponent, canActivate: [LoginGuard] },
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [LoginGuard] },

  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/client/cliente.module').then((m) => m.ClienteModule),
  },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64] // Ajusta según tu navbar (opcional)
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
