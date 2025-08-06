import { Component, Input, OnInit } from '@angular/core';
import { ComentariosService } from '../../../services/comentarios.service';
import Swal from 'sweetalert2';
import { Comentarios } from '../../../interface/comentarios';
import { opiniones } from '../../../interface/opiniones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-comentarios',
  standalone: false,
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
 @Input() opinion!: opiniones;

  showForm = false;
  comentarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comentarioService: ComentariosService
  ) {
    this.comentarioForm = this.fb.group({
      mensaje: ['', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  enviarComentario() {
    const nuevoComentario: Comentarios = {
      opinionId: this.opinion.idOpinion,
      mensaje: this.comentarioForm.value.mensaje
    };

    this.comentarioService.crearComentario(nuevoComentario).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Comentario agregado', 'success');
        // Simular actualización
        this.opinion.comentarioAdmin = nuevoComentario.mensaje;
        this.opinion.fechaComentarioAdmin = new Date();
        this.showForm = false;
        this.comentarioForm.reset();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar el comentario', 'error');
      }
    });
  }

  eliminarComentario() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el comentario del administrador.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.comentarioService.eliminarComentario(this.opinion.comentarioId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El comentario ha sido eliminado', 'success');
            this.opinion.comentarioAdmin = '';
    
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el comentario', 'error');
          }
        });
      }
    });
  }
}



