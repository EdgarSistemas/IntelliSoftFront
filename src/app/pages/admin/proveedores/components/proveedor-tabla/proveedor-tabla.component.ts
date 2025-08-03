import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedores.service';
import { Proveedor } from '../../interface/proveedor.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-proveedor-table',
  templateUrl: './proveedor-tabla.component.html',
  styleUrls: ['./proveedor-tabla.component.css'],
  standalone: false
})
export class ProveedorTableComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  mostrarFormulario = false;
  filtro: string = '';
  isLoading: boolean = false;
  proveedorSeleccionado: Proveedor | null = null;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.isLoading = true;
    this.proveedorService.getAll().subscribe({
      next: data => {
        this.proveedores = data;
        this.proveedoresFiltrados = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleFormulario(): void {
    this.proveedorSeleccionado = null;
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onProveedorCreado(): void {
    this.loadProveedores();
    this.mostrarFormulario = false;
    this.proveedorSeleccionado = null;
  }

  filtrarProveedores(): void {
    const filtroLower = this.filtro.toLowerCase().trim();
    this.proveedoresFiltrados = this.proveedores.filter(prov =>
      Object.values(prov).some(valor =>
        valor?.toString().toLowerCase().includes(filtroLower)
      )
    );
  }

  editarProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;
    this.mostrarFormulario = true;
  }

  eliminarProveedor(proveedor: Proveedor): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el proveedor "${proveedor.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.proveedorService.delete(proveedor.idProveedor).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El proveedor fue eliminado correctamente',
              confirmButtonColor: '#0062BA'
            });
            this.loadProveedores();
          },
          error: err => {
            console.error('Error al eliminar proveedor', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el proveedor',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}
