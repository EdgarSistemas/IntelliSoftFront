import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comentarios',
  standalone:false,
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit {
 comentarios = [
    { id: 1, nombre: 'Juan', comentario: '¿Cómo funciona el sistema?', respuesta: '' },
    { id: 2, nombre: 'Ana', comentario: 'Me encanta el producto!', respuesta: 'Gracias por tu comentario' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  responderComentario(comentario: any) {
    console.log('Responder comentario:', comentario);
    // Aquí conectarás con tu API para guardar la respuesta
  }
}
