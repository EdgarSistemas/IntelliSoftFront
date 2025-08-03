import { InsumoService } from './../../service/insumo.service';
import { Insumo } from './../../interface/insumo.interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-insumo-tabla',
  templateUrl: './insumo-tabla.component.html',
  styleUrls: ['./insumo-tabla.component.css'],
  standalone: false
})
export class InsumoTablaComponent implements OnInit {
  insumos: Insumo[] = [];
  insumosFiltrados: Insumo[] = [];
  isLoading = false;
  filtro = '';
  mostrarFormulario = false;
  insumoSeleccionado: Insumo | null = null;

  constructor(private insumoService: InsumoService) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }

  cargarInsumos(): void {
    this.isLoading = true;
    this.insumoService.getAll().subscribe({
      next: data => {
        this.insumos = data;
        this.insumosFiltrados = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filtrarInsumos(): void {
    const filtroLower = this.filtro.toLowerCase().trim();
    this.insumosFiltrados = this.insumos.filter(ins =>
      Object.values(ins).some(valor =>
        valor?.toString().toLowerCase().includes(filtroLower)
      )
    );
  }

  toggleFormulario(): void {
    this.insumoSeleccionado = null;
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onInsumoGuardado(): void {
    this.cargarInsumos();
    this.mostrarFormulario = false;
    this.insumoSeleccionado = null;
  }

  editarInsumo(insumo: Insumo): void {
    this.insumoSeleccionado = insumo;
    this.mostrarFormulario = true;
  }

  eliminarInsumo(insumo: Insumo): void {
    Swal.fire({
      title: '¿Eliminar insumo?',
      text: `Se eliminará el insumo "${insumo.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.insumoService.delete(insumo.idInsumo).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Insumo eliminado',
              text: 'El insumo fue eliminado correctamente',
              confirmButtonColor: '#0062BA'
            });
            this.cargarInsumos();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el insumo',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}
