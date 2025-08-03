import { Component, OnInit } from '@angular/core';
import { UnidadService } from '../../service/unidad.service';
import { Unidad } from '../../interface/unidad.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-unidad-tabla',
  templateUrl: './unidad-tabla.component.html',
  styleUrls: ['./unidad-tabla.component.css'],
  standalone: false
})
export class UnidadTablaComponent implements OnInit {
  unidades: Unidad[] = [];
  unidadesFiltradas: Unidad[] = [];
  unidadSeleccionada: Unidad | null = null;
  mostrarFormulario: boolean = false;
  filtro: string = '';
  isLoading: boolean = false;

  constructor(private unidadService: UnidadService) {}

  ngOnInit(): void {
    this.loadUnidades();
  }

  loadUnidades(): void {
    this.isLoading = true;
    this.unidadService.getAll().subscribe({
      next: data => {
        this.unidades = data;
        this.unidadesFiltradas = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar las unidades', 'error');
      }
    });
  }

  filtrarUnidades(): void {
    const filtroLower = this.filtro.toLowerCase().trim();
    this.unidadesFiltradas = this.unidades.filter(unidad =>
      Object.values(unidad).some(valor =>
        valor?.toString().toLowerCase().includes(filtroLower)
      )
    );
  }

  toggleFormulario(): void {
    this.unidadSeleccionada = null;
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onUnidadGuardada(): void {
    this.loadUnidades();
    this.mostrarFormulario = false;
    this.unidadSeleccionada = null;
  }

  editarUnidad(unidad: Unidad): void {
    this.unidadSeleccionada = unidad;
    this.mostrarFormulario = true;
  }

  eliminarUnidad(unidad: Unidad): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la unidad "${unidad.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.unidadService.delete(unidad.idUnidad).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La unidad fue eliminada correctamente', 'success');
            this.loadUnidades();
          },
          error: err => {
            Swal.fire('Error', err?.error?.message || 'No se pudo eliminar la unidad', 'error');
          }
        });
      }
    });
  }
}
