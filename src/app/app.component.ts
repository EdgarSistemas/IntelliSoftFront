import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos'; // Importa AOS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'intelliSoft';
  ngOnInit() {
    AOS.init(); // Inicializa AOS
  }
}
