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
    // Cargar ambos al inicio
    this.cargarDatosIniciales();
  }

  /**
   * Carga las opiniones y luego los comentarios del administrador.
   * Es importante cargar las opiniones primero para que el método
   * getComentarioAdminParaOpinion tenga las opiniones disponibles.
   */
  cargarDatosIniciales(): void {
    this.opinionesService.obetenerOpiniones().subscribe({
      next: (data: opiniones[]) => {
        // Mapea las fechas de string a Date para las opiniones
        this.opiniones = data.map(opinion => ({
          ...opinion,
          fecha: new Date(opinion.fecha)
        }));
        // Una vez que las opiniones están cargadas, cargar los comentarios del admin
        this.cargarComentarios();
      },
      error: (error) => {
        console.error('Error al cargar opiniones:', error);
        Swal.fire('Error', 'No se pudieron cargar las opiniones', 'error');
      }
    });
  }

  /**
   * Carga todos los comentarios del administrador.
   */
  cargarComentarios(): void {
    this.comentariosService.getComentarios().subscribe({
      next: (data: Comentarios[]) => {
        // Mapea las fechas de string a Date para los comentarios
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

  /**
   * Busca y retorna el comentario del administrador asociado a una opinión.
   * La asociación se hace buscando en el mensaje del comentario el patrón
   * "Respuesta a opinión #{idOpinion}:".
   * @param idOpinion El ID de la opinión para la cual buscar el comentario.
   * @returns El objeto Comentarios si se encuentra, de lo contrario, undefined.
   */
  getComentarioAdminParaOpinion(idOpinion: number): Comentarios | undefined {
    // Buscamos en todos los comentarios si alguno empieza con "Respuesta a opinión #<idOpinion>:"
    return this.comentarios.find(comentario =>
      comentario.mensaje.startsWith(`Respuesta a opinión #${idOpinion}:`)
    );
  }

  /**
   * Abre un cuadro de diálogo para que el administrador responda a una opinión.
   * La respuesta se guarda como un nuevo comentario del administrador.
   * @param opinion La opinión del cliente a la que se va a responder.
   */
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
        // Creamos el mensaje del comentario con el prefijo para poder relacionarlo después
        const mensajeRespuesta = `Respuesta a opinión #${opinion.idOpinion}: ${result.value}`;
        
        const comentarioRespuesta: Comentarios = {
        idComentario: 0 ,// El backend debe asignar el ID real, no lo necesitamos aquí al crear
          mensaje: mensajeRespuesta,
          usuarioId: 'admin-id-ejemplo', // **IMPORTANTE: Reemplazar con el ID real del admin que está logueado**
          nombreUsuario: 'Administrador', // O el nombre real del admin logueado
          fecha: new Date() // La fecha actual en el frontend
        };

        this.comentariosService.crearComentario(comentarioRespuesta).subscribe({
          next: (nuevoComentario) => {
            // Agrega el nuevo comentario a la lista local para que se muestre inmediatamente
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

  /**
   * Elimina un comentario del administrador.
   * @param idComentario El ID del comentario a eliminar.
   */
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
