import { Component, OnInit  } from '@angular/core';
import { ManualesService } from '../../services/manuales.service';
import { Documento, Producto } from '../../interface/manuales';

@Component({
  selector: 'app-manuales',
  standalone:false,
  templateUrl: './manuales.component.html',
  styleUrl: './manuales.component.css'
})
export class ManualesComponent implements OnInit{

  productos: Producto[] = [];
  cargando: boolean = true;

  constructor(private documentosService: ManualesService) {}

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.documentosService.obtenerDocumentos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando = false;
      }
    });
  }
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
