import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Users } from '../../interface/users';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users[] = []; // Cambiado a array de Users
  filteredUsers: Users[] = []; // Tipado correctamente
  loading = true;
  selectedRole: string = 'all';
  searchTerm: string = '';
  selectedUser: Users | null = null; // Para edición

  roleOptions = [
    { value: 'all', label: 'Todos los roles' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'admin', label: 'Administradores' },
    { value: 'anonimo', label: 'Anónimos' }
  ];

  constructor(private usersService: UsersService) {} // Convención: minúscula para servicios

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe(
      (data: Users[]) => { // Especifica el tipo de retorno
        this.users = data;
        this.filteredUsers = [...data]; // Copia el array
        this.loading = false;
        this.applyFilters();

      },
      (error) => {
        console.error('Error loading users', error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const roleMatch = this.selectedRole === 'all' || user.rol === this.selectedRole;

      // Filtro por búsqueda (nombre, apellido o email)
      const searchMatch = this.searchTerm === '' ||
        user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.apellidos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      return roleMatch && searchMatch;
    });
  }

  onRoleChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUser(id).subscribe(
          () => {
            this.users = this.users.filter(user => user.id !== id);
            this.applyFilters();
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }

 async editarUsuario(user: Users): Promise<void> {
  try {
    // Mostrar diálogo de edición
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: `Editar Usuario: ${user.email}`,
      html: `
        <div class="mb-3">
          <label for="swal-email" class="form-label">Email</label>
          <input id="swal-email" class="form-control" value="${user.email}">
        </div>
        <div class="mb-3">
          <label for="swal-password" class="form-label">Contraseña</label>
          <input id="swal-password" type="password" class="form-control" placeholder="Dejar vacío para no cambiar">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-swal-container'
      },
      preConfirm: () => {
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const password = (document.getElementById('swal-password') as HTMLInputElement).value;

        if (!email) {
          Swal.showValidationMessage('El email es obligatorio');
          return false;
        }

        return { email, password };
      }
    });

    // Si el usuario confirmó los cambios
    if (isConfirmed && formValues) {
      // Mostrar carga mientras se procesa
      Swal.fire({
        title: 'Guardando cambios...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Preparar datos para enviar
      const updateData = {
        id: user.id,
        email: formValues.email,
        password: formValues.password || undefined // Envía undefined si no hay cambio
      };

      // Llamar al servicio
      const updatedUser = await this.usersService.editarUser(updateData).toPromise();

      

      // Mostrar confirmación
      Swal.fire({
        icon: 'success',
        title: '¡Usuario actualizado!',
        text: 'Los cambios se guardaron correctamente',
        timer: 2000,
        showConfirmButton: false
      });
      this.loadUsers()
    }
  } catch (error) {
    console.error('Error al editar usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el usuario',
    });
  }
}

}