export interface opiniones{
    idOpinion: number 
    usuarioId: string,
    usuarioNombre: string,
    productoId: number,
    productoNombre: string,
    calificacion: number,
    comentario: string,
    fecha: Date,
    comentarioId: number,
    comentarioAdmin: string,
    fechaComentarioAdmin: Date
}