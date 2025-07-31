import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone:false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
usuarios = [
{ id: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan@example.com', rol: 'admin' },
{ id: 2, nombre: 'Ana', apellido: 'Gómez', correo: 'ana@example.com', rol: 'user' },
];
constructor() { }
ngOnInit(): void {
}
editarUsuario(usuario: any) {
console.log('Editar usuario:', usuario);
// Aquí conectarás con tu API para editar el usuario
}
eliminarUsuario(usuario: any) {
console.log('Eliminar usuario:', usuario);
// Aquí conectarás con tu API para eliminar el usuario
}
}
