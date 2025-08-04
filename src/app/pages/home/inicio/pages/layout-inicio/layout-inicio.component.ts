import { Component, OnInit} from '@angular/core';
import { OpinionesService } from '../../services/opiniones.service';

@Component({
  selector: 'app-layout-inicio',
  standalone:false,
  templateUrl: './layout-inicio.component.html',
  styleUrl: './layout-inicio.component.css'
})
export class LayoutInicioComponent implements OnInit {
 opiniones: any[] = []; 

  constructor(private OpinionesService: OpinionesService ) {}

  ngOnInit(): void {
    this.ObetenerOpiniones();
  }
  ObetenerOpiniones(): void {
    this.OpinionesService.obetenerOpiniones().subscribe(
      (response: any) => {
        this.opiniones = response;
      },
      (error: any) => {
        console.error('Error al obtener opiniones:', error);
      }
    );
}

getEstrellas(calificacion: number): any[] {
  const estrellas = [];
  const estrellasLlenas = Math.floor(calificacion);
  const tieneMediaEstrella = calificacion % 1 >= 0.5;

  // Estrellas llenas
  for (let i = 0; i < estrellasLlenas; i++) {
    estrellas.push('fill');
  }

  // Media estrella (si aplica)
  if (tieneMediaEstrella && estrellas.length < 5) {
    estrellas.push('half');
  }

  // Estrellas vacías
  while (estrellas.length < 5) {
    estrellas.push('empty');
  }

  return estrellas;
}

}