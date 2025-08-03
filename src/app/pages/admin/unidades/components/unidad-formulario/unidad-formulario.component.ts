import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UnidadService } from '../../service/unidad.service';
import { Unidad } from '../../interface/unidad.interface';

@Component({
  selector: 'admin-unidad-formulario',
  templateUrl: './unidad-formulario.component.html',
  standalone: false
})
export class UnidadFormularioComponent implements OnChanges {
  @Input() unidad: Unidad | null = null;
  @Output() onUnidadGuardada = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  unidadForm: FormGroup;

  constructor(private fb: FormBuilder, private unidadService: UnidadService) {
    this.unidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      simbolo: ['', [Validators.required, Validators.maxLength(5)]],
      descripcion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unidad'] && this.unidad) {
      this.unidadForm.patchValue({
        nombre: this.unidad.nombre,
        simbolo: this.unidad.simbolo,
        descripcion: this.unidad.descripcion
      });
    }
  }

  guardar(): void {
    if (this.unidadForm.invalid) {
      this.unidadForm.markAllAsTouched();
      return;
    }

    const datos = this.unidadForm.value;

    if (this.unidad) {
      this.unidadService.update(this.unidad.idUnidad, datos).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Unidad actualizada correctamente', 'success');
          this.onUnidadGuardada.emit();
          this.unidadForm.reset();
        },
        error: err => {
          Swal.fire('Error', err?.error?.message || 'No se pudo actualizar la unidad', 'error');
        }
      });
    } else {
      this.unidadService.create(datos).subscribe({
        next: () => {
          Swal.fire('Creado', 'Unidad registrada correctamente', 'success');
          this.onUnidadGuardada.emit();
          this.unidadForm.reset();
        },
        error: err => {
          Swal.fire('Error', err?.error?.message || 'No se pudo crear la unidad', 'error');
        }
      });
    }
  }

  cancelar(): void {
    this.unidadForm.reset();
    this.onCancelar.emit();
  }

  isInvalid(campo: string): boolean {
    const ctrl = this.unidadForm.get(campo);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
