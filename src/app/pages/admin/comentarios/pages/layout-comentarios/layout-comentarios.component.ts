import { Component } from '@angular/core';
import { opiniones } from '../../interface/opiniones';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-layout-comentarios',
  standalone: false,
  templateUrl: './layout-comentarios.component.html',
  styleUrl: './layout-comentarios.component.css',
})
export class LayoutComentariosComponent {
  opiniones: opiniones[] = [];
  loading = true;

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.comentariosService.getOpiniones().subscribe({
      // ajustar para quitar el loader
      next: (res) => {
        this.opiniones = res
        this.loading = false
      },
      error: () => console.error('Error al obtener opiniones'),
    });
  }

  openedIndex: number | null = null;

  toggleAccordion(index: number) {
    this.openedIndex = this.openedIndex === index ? null : index;
  }
}
