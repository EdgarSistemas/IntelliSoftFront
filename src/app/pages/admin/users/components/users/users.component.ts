import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Users } from '../../interface/users';

@Component({
  selector: 'app-users',
  standalone:false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
users: any[] = [];
  filteredUsers: any[] = [];
  loading = true;
  selectedRole: string = 'all';
  searchTerm: string = '';

  // Opciones de filtro
  roleOptions = [
    { value: 'all', label: 'Todos los roles' },
    { value: 'cliente', label: 'Clientes' },
    { value: 'admin', label: 'Administradores' },
    { value: 'anonimo', label: 'Anónimos' }
  ];
constructor(private UsersService: UsersService) {}

ngOnInit() {
  this.loadUsers();
}

loadUsers(): void {
    this.loading = true;
    this.UsersService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
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
      // Filtro por rol
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
        this.UsersService.deleteUser(id).subscribe(
          () => {
            this.users = this.users.filter(user => user.id !== id);
            this.applyFilters();
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          },
          (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el usuario',
              'error'
            );
          }
        );
      }
    });
  }

  editUser(user: any): void {
    // Implementaremos el modal después
    console.log('Editar usuario:', user);
  }
}
