import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../services/comentarios.service';
import { OpinionesService } from '../../../../home/inicio/services/opiniones.service';
import Swal from 'sweetalert2';
import { Comentarios } from '../../interface/comentarios';
import { opiniones } from '../../../../home/inicio/interface/opinion'; // Tu interfaz de opiniones

@Component({
  selector: 'app-comentarios',
  standalone: false,
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  opiniones: opiniones[] = [];
  comentarios: Comentarios[] = [];

  constructor(
    private comentariosService: ComentariosService,
    private opinionesService: OpinionesService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }


  cargarDatosIniciales(): void {
    this.opinionesService.obetenerOpiniones().subscribe({
      next: (data: opiniones[]) => {
     
        this.opiniones = data.map(opinion => ({
          ...opinion,
          fecha: new Date(opinion.fecha)
        }));
     
        this.cargarComentarios();
      },
      error: (error) => {
        console.error('Error al cargar opiniones:', error);
        Swal.fire('Error', 'No se pudieron cargar las opiniones', 'error');
      }
    });
  }


  cargarComentarios(): void {
    this.comentariosService.getComentarios().subscribe({
      next: (data: Comentarios[]) => {
     
        this.comentarios = data.map(comentario => ({
          ...comentario,
          fecha: new Date(comentario.fecha)
        }));
      },
      error: (error) => {
        console.error('Error al cargar comentarios:', error);
        Swal.fire('Error', 'No se pudieron cargar los comentarios', 'error');
      }
    });
  }

 
  getComentarioAdminParaOpinion(idOpinion: number): Comentarios | undefined {

    return this.comentarios.find(comentario =>
      comentario.mensaje.startsWith(`Respuesta a opinión #${idOpinion}:`)
    );
  }

 
  responderOpinion(opinion: opiniones): void {
    Swal.fire({
      title: `Responder a ${opinion.usuarioNombre}`,
      html: `<p>Producto: ${opinion.productoNombre}</p>
             <p>Opinión: "${opinion.comentario}"</p>`,
      input: 'textarea',
      inputPlaceholder: 'Escribe tu respuesta aquí...',
      showCancelButton: true,
      confirmButtonText: 'Enviar respuesta',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const mensajeRespuesta = `Respuesta a opinión #${opinion.idOpinion}: ${result.value}`;
        
        const comentarioRespuesta: Comentarios = {
        idComentario: 0 ,// 
          mensaje: mensajeRespuesta,
          usuarioId: 'admin-id-ejemplo',
          nombreUsuario: 'Administrador', 
          fecha: new Date() //
        };

        this.comentariosService.crearComentario(comentarioRespuesta).subscribe({
          next: (nuevoComentario) => {
            this.comentarios.push(nuevoComentario); 
            Swal.fire('Éxito', 'Respuesta asociada correctamente', 'success');
          },
          error: (error) => {
            console.error('Error al guardar comentario:', error);
            Swal.fire('Error', 'No se pudo guardar la respuesta', 'error');
          }
        });
      }
    });
  }

  eliminarComentario(idComentario: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comentariosService.eliminarComentario(idComentario).subscribe({
          next: () => {
            // Filtra el comentario eliminado de la lista local
            this.comentarios = this.comentarios.filter(c => c.idComentario !== idComentario);
            Swal.fire('Eliminado', 'El comentario ha sido eliminado', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el comentario', 'error');
          }
        });
      }
    });
  }
}
