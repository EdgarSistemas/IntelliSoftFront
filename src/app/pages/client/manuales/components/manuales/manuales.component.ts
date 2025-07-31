import { Component } from '@angular/core';

@Component({
  selector: 'app-manuales',
  standalone:false,
  templateUrl: './manuales.component.html',
  styleUrl: './manuales.component.css'
})
export class ManualesComponent {
  manuals = [
    {
      title: 'Manual de Usuario Pro',
      version: '3.2',
      size: '2.4 MB',
      downloadUrl: '#',
      viewUrl: '#'
    },
    // Agrega más manuales...
  ];

  videos = [
    {
      title: 'Configuración Inicial',
      duration: 8,
      embedUrl: 'https://www.youtube.com/embed/ejemplo1',
      url: '#'
    },
    // Agrega más videos...
  ];

  faqs = [
    {
      question: '¿Cómo actualizar el firmware?',
      answer: 'Puedes descargar la última versión desde el panel de control...',
      video: '#'
    },
    // Agrega más FAQs...
  ];
}
