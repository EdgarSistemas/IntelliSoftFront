import { Component, OnInit} from '@angular/core';
import { OpinionesService } from '../../services/opiniones.service';


@Component({
  selector: 'app-layout-inicio',
  standalone:false,
  templateUrl: './layout-inicio.component.html',
  styleUrl: './layout-inicio.component.css'
})
export class LayoutInicioComponent implements OnInit {
currentSlideIndex = 0;
  groupedTestimonios: any[] = [];
  
 opiniones: any[] = []; 

  constructor(private OpinionesService: OpinionesService ) {}

  ngOnInit(): void {
    this.ObetenerOpiniones();
    
  }
 


  getEstrellas(calificacion: number): string[] {
    const estrellas = [];
    const fullStars = Math.floor(calificacion);
    const hasHalfStar = calificacion % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      estrellas.push('fill');
    }
    
    if (hasHalfStar) {
      estrellas.push('half');
    }
    
    while (estrellas.length < 5) {
      estrellas.push('empty');
    }
    
    return estrellas.slice(0, 5);
  }

  groupTestimonios() {
  const groupSize = 3;
  const groups = [];
  
  
  for (let i = 0; i < this.opiniones.length; i += groupSize) {
    groups.push(this.opiniones.slice(i, i + groupSize));
  }
  
  return groups;
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
}