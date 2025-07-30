import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-empresa',
  standalone:false,
  templateUrl: './layout-empresa.component.html',
  styleUrl: './layout-empresa.component.css'
})
export class LayoutEmpresaComponent {

  services = [
  {
    icon: 'bi bi-code-slash',
    title: 'Desarrollo Custom',
    description: 'Software adaptado a tus necesidades específicas'
  },
  {
    icon: 'bi bi-cloud',
    title: 'Soluciones Cloud',
    description: 'Infraestructura escalable y segura'
  },
  {
    icon: 'bi bi-robot',
    title: 'Automatización',
    description: 'Optimización de procesos con IA'
  }
];
processSteps = [
  {
    icon: 'bi bi-lightbulb',
    title: 'Análisis de Requerimientos',
    description: 'Entendemos tus necesidades y objetivos',
    number: 1
  },
  {
    icon: 'bi bi-pencil-square',
    title: 'Diseño de Solución',
    description: 'Creamos un plan detallado y personalizado',
    number: 2
  },
  {
    icon: 'bi bi-gear',
    title: 'Desarrollo y Pruebas',
    description: 'Implementamos y validamos la solución',
    number: 3
  },
  {
    icon: 'bi bi-check-circle',
    title: 'Implementación y Soporte',
    description: 'Lanzamiento y asistencia continua',
    number: 4
  }
];

}
