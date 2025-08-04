import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Profile, UpdateUserDto } from '../../interface/profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  details: Profile | null = null; 
  
  editMode = false;

  updateUserData: UpdateUserDto = {
    nombre: '',
    apellidos: '',
    email: '',
    phoneNumber: '',
    newPassword: '',
    currentPassword: ''
  };


  constructor(private profileService: ProfileService) {}
  
  ngOnInit(): void {
    this.cargarDataProfile();
  }

  cargarDataProfile(): void {
    this.profileService.getUserDetail().subscribe({
      next: (data) => {
        this.details = data;
        console.log('Datos recibidos:', this.details);
      },
      error: (err) => console.error('Error:', err)
    });
  }

    abrirModal() {
    if (this.details) {
      this.updateUserData = {
        nombre: this.details.nombre,
        apellidos: this.details.apellidos,
        email: this.details.email,
        phoneNumber: this.details.phoneNumber,
        newPassword: '',
        currentPassword: ''
      };
      this.editMode = true;
    }
  }

  cerrarModal() {
    this.editMode = false;
  }

  guardarCambios(data: UpdateUserDto) {
      if (!data.nombre || data.nombre.length < 2) {
        Swal.fire('Error', 'El nombre es requerido y debe tener al menos 2 caracteres', 'error');
        return;
      }

      if (!data.apellidos || data.apellidos.length < 2) {
        Swal.fire('Error', 'Los apellidos son requeridos y deben tener al menos 2 caracteres', 'error');
        return;
      }

      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        Swal.fire('Error', 'El email no es válido', 'error');
        return;
      }

      if (data.phoneNumber && !/^\d{10}$/.test(data.phoneNumber)) {
        Swal.fire('Error', 'El teléfono debe tener 10 dígitos numéricos', 'error');
        return;
      }

      if (data.newPassword && !/^(?=.*[A-Z])(?=.*[!@#$%^&*.]).*$/.test(data.newPassword)) {
        Swal.fire('Error', 'La nueva contraseña debe contener al menos una letra mayúscula y un carácter especial (!@#$%^&*.)', 'error');
        return;
      }

      if (data.newPassword && !data.currentPassword) {
        Swal.fire('Error', 'Debe ingresar la contraseña actual para cambiar la nueva contraseña', 'error');
        return;
      }
    this.profileService.updateUser(this.updateUserData).subscribe({
      next: (response) => {
        // Aquí response es texto plano, puede ser mensaje de éxito o advertencia
        Swal.fire('¡Éxito!', response || 'Perfil actualizado correctamente', 'success');
        this.cargarDataProfile();
        this.cerrarModal();
      },
      error: (error) => {
        // Para errores, a veces el backend también envía texto plano
        let mensajeError = 'Error al actualizar el perfil';
        
        // Si la respuesta del error es texto plano, lo mostramos
        if (error.error instanceof Blob) {
          error.error.text().then((text: string) => {
            Swal.fire('Error', text, 'error');
          });
        } else if (typeof error.error === 'string') {
          Swal.fire('Error', error.error, 'error');
        } else if (error.message) {
          Swal.fire('Error', error.message, 'error');
        } else {
          Swal.fire('Error', mensajeError, 'error');
        }
      }
    });
  }

}
