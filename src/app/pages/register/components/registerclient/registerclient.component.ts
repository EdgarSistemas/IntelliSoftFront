import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-registerclient',
  standalone: false,
  templateUrl: './registerclient.component.html',
  styleUrl: './registerclient.component.css'
})
export class RegisterclientComponent implements OnInit {
isLogin = true;
  loading = false;
  registeredEmail = '';

formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    rol: new FormControl(''),
  });

constructor(private userService: UserService) { }
 ngOnInit(): void {

  // Cargar usuarioId si existe
  const usuarioId = localStorage.getItem('usuarioId');
}
  toggleCards() {
    this.isLogin = !this.isLogin;
  }

 registrarUsuario() {
  if (this.formulario.invalid) return;

  this.loading = true; // Comienza carga

  const formValue = this.formulario.value;
     
  this.userService.registrarOVerificarAnonimo({
    email: formValue.email ?? '',
    nombre: formValue.nombre ?? '',
    apellidos: formValue.apellidos ?? ''
  }).subscribe({
    next: (response) => {
      this.loading = false; // Finaliza carga

      if (!response.usuario?.id) {
        throw new Error('El servidor no devolvió un ID válido');
      }

      localStorage.setItem('usuarioId', response.usuario.id);
      localStorage.setItem('usuarioEmail', formValue.email ?? '');

      this.registeredEmail = formValue.email ?? '';
      const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
      modal.show();
    },
    error: (error) => {
      this.loading = false;
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo verificar/registrar el usuario', 'error');
    }
  });
}

}
