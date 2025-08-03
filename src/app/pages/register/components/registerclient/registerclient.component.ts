import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usercliente } from '../../interface/usercliente';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

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
  direccion: new FormControl('', [Validators.required]),
  phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  rol: new FormControl('anonimo', [Validators.required])
  });

constructor(private userService: UserService) { }
ngOnInit(): void {
}

  toggleCards() {
    this.isLogin = !this.isLogin;
  }

 registrarCliente() {
    const formValue = this.formulario.value;
    const userCliente: Usercliente = {
      nombre: formValue.nombre ?? '',
      apellidos: formValue.apellidos ?? '',
      email: formValue.email ?? '',
      direccion: formValue.direccion ?? '',
      phoneNumber: formValue.phoneNumber ?? '',
      password: formValue.password ?? '',
      rol: 'cliente'
    };

    this.userService.registrarCliente(userCliente).subscribe({
      next: (response) => {
        console.log('Cliente registrado con éxito', response);
        this.formulario.reset();
        // Mostrar un mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Cliente registrado correctamente.',
        });
      },
      error: (error) => {
        console.error('Error al registrar el cliente', error);
        this.formulario.reset();
        // Mostrar un mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al registrar el cliente. Por favor, inténtalo de nuevo.',
        });
      }
    });
  }
}
