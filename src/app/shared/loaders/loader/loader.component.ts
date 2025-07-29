import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
isLoading: boolean = true;
constructor(private router: Router) {
// Simular carga o esperar a que todo esté listo
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // 2 segundos de ejemplo

    // Opcional: controlar carga durante navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.isLoading = true;
      });
    
}}
