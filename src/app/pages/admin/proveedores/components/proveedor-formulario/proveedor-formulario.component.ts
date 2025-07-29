import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedor-formulario',
  templateUrl: './proveedor-formulario.component.html',
  styleUrl: './proveedor-formulario.component.css',
  standalone: false
})
export class ProveedorFormularioComponent {
  proveedorForm: FormGroup;
  @Output() onProveedorCreado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      contacto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      descripcionServicio: [''],
      estatus: [1, Validators.required]
    });
  }

  guardar(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const nuevoProveedor = this.proveedorForm.value;

    this.proveedorService.create(nuevoProveedor).subscribe({
      next: () => {
        alert('Proveedor creado correctamente');
        this.onProveedorCreado.emit();
        this.proveedorForm.reset({ estatus: 1 });
      },
      error: err => {
        console.error('Error al crear proveedor', err);
        alert('Ocurrió un error al registrar el proveedor');
      }
    });
  }
}
