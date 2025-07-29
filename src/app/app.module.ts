import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//ADMIN

import { InicioComponent } from './pages/home/inicio/components/inicio/inicio.component';
import { AyudaComponent } from './pages/home/ayuda/components/ayuda/ayuda.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { EmpresaComponent } from './pages/home/empresa/components/empresa/empresa.component';
import { DocumentsComponent } from './pages/home/documents/components/documents/documents.component';
import { CotizacionComponent } from './pages/home/cotizacion/components/cotizacion/cotizacion.component';
import { FooterComponent } from './shared/footer/components/footer/footer.component';
import { LayoutAyudaComponent } from './pages/home/ayuda/pages/layout-ayuda/layout-ayuda.component';
import { LayoutCotizacionComponent } from './pages/home/cotizacion/pages/layout-cotizacion/layout-cotizacion.component';
import { LayoutDocumentsComponent } from './pages/home/documents/pages/layout-documents/layout-documents.component';
import { LayoutEmpresaComponent } from './pages/home/empresa/pages/layout-empresa/layout-empresa.component';
import { LayoutInicioComponent } from './pages/home/inicio/pages/layout-inicio/layout-inicio.component';
import { NavbarInicioComponent } from './pages/home/inicio/pages/navbar-inicio/navbar-inicio.component';
import { FooterInicioComponent } from './pages/home/inicio/pages/footer-inicio/footer-inicio.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    AyudaComponent,
    CotizacionComponent,
    DocumentsComponent,
    EmpresaComponent,
    InicioComponent,
    FooterComponent,
    LoginComponent,
    LayoutAyudaComponent,
    LayoutCotizacionComponent,
    LayoutDocumentsComponent,
    LayoutEmpresaComponent,
    LayoutInicioComponent,
    NavbarInicioComponent,
    FooterInicioComponent,
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
        allowedDomains: ['localhost:7259'],
        disallowedRoutes: ['localhost:7259/api/auth/login'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [NavbarInicioComponent, FooterInicioComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
