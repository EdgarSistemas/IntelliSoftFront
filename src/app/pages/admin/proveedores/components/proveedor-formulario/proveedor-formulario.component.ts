import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProveedorService } from '../../services/proveedores.service';
import { Proveedor } from '../../interface/proveedor.interface';

@Component({
  selector: 'app-proveedor-formulario',
  templateUrl: './proveedor-formulario.component.html',
  standalone: false
})
export class ProveedorFormularioComponent implements OnChanges {
  proveedorForm: FormGroup;

  @Input() proveedor?: Proveedor | null = null;
  @Output() onProveedorCreado = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.proveedorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(25)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contacto: ['', [Validators.maxLength(50)]],
      correoElectronico: ['', [Validators.email, Validators.maxLength(50)]],
      descripcionServicio: ['', [Validators.maxLength(100)]],
      estatus: [1, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proveedor'] && this.proveedor) {
      this.proveedorForm.patchValue({
        nombre: this.proveedor.nombre,
        telefono: this.proveedor.telefono,
        contacto: this.proveedor.contacto,
        correoElectronico: this.proveedor.correoElectronico,
        descripcionServicio: this.proveedor.descripcionServicio
      });
    }
  }

  guardar(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const nuevoProveedor = this.proveedorForm.value;

    if (this.proveedor) {
      this.proveedorService.update(this.proveedor.idProveedor, nuevoProveedor).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Proveedor actualizado',
            text: 'Los datos se actualizaron correctamente',
            confirmButtonColor: '#0062BA'
          });
          this.onProveedorCreado.emit();
          this.proveedorForm.reset({ estatus: 1 });
        },
        error: err => {
          console.error('Error al actualizar proveedor', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el proveedor: ' + err?.error?.message,
            confirmButtonColor: '#dc3545'
          });
        }
      });
    } else {
      this.proveedorService.create(nuevoProveedor).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Proveedor creado',
            text: 'El proveedor se registró correctamente',
            confirmButtonColor: '#0062BA'
          });
          this.onProveedorCreado.emit();
          this.proveedorForm.reset({ estatus: 1 });
        },
        error: err => {
          console.error('Error al crear proveedor', err?.error?.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar el proveedor: ' + err?.error?.message,
            confirmButtonColor: '#dc3545'
          });
        }
      });
    }
  }

  cancelar(): void {
    this.proveedorForm.reset({ estatus: 1 });
    this.onCancelar.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.proveedorForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
