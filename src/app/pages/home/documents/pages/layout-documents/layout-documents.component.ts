import { Component } from '@angular/core';


@Component({
  selector: 'app-layout-documents',
  standalone: false,
  templateUrl: './layout-documents.component.html',
  styleUrls: ['./layout-documents.component.css']
})
export class LayoutDocumentsComponent {
 categories = [
    { id: 1, name: 'Manuales', icon: 'bi bi-journal-text', count: 24 },
    { id: 2, name: 'Guías Rápidas', icon: 'bi bi-card-checklist', count: 15 },
    { id: 3, name: 'API', icon: 'bi bi-code-square', count: 8 },
    { id: 4, name: 'Videos', icon: 'bi bi-play-circle', count: 32 }
  ];

  featuredResources = [
    {
      title: 'Manual de Usuario v3.2',
      type: 'PDF',
      date: '15/03/2023',
      description: 'Documentación completa del sistema acuapónico',
      fileUrl: '#',
      fileSize: '2.4 MB'
    },
    // Más recursos...
  ];
}



