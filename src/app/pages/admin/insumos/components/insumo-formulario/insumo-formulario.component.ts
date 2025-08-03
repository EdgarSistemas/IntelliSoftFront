import { UnidadService } from './../../../unidades/service/unidad.service';
import { InsumoService } from './../../service/insumo.service';
import { Insumo } from './../../interface/insumo.interface';
import { Unidad } from './../../../unidades/interface/unidad.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-insumo-formulario',
  templateUrl: './insumo-formulario.component.html',
  styleUrls: ['./insumo-formulario.component.css'],
  standalone: false
})
export class InsumoFormularioComponent implements OnInit {
  @Input() insumo: Insumo | null = null;
  @Output() onInsumoGuardado = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  insumoForm!: FormGroup;
  unidades: Unidad[] = [];

  constructor(
    private fb: FormBuilder,
    private insumoService: InsumoService,
    private unidadService: UnidadService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUnidades();
  }

  initForm(): void {
    this.insumoForm = this.fb.group({
      nombre: [this.insumo?.nombre || '', [Validators.required, Validators.maxLength(25)]],
      descripcion: [this.insumo?.descripcion || '', [Validators.required, Validators.maxLength(100)]],
      unidadId: [this.insumo?.unidadId || '', Validators.required]
    });

    // En edición, no permitir cambiar la unidad
    if (this.insumo) {
      this.insumoForm.get('unidadId')?.disable();
    }
  }

  loadUnidades(): void {
    this.unidadService.getAll().subscribe({
      next: (data) => {
        this.unidades = data.filter(u => u.estatus === 1);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las unidades disponibles',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  guardar(): void {
    if (this.insumoForm.invalid) {
      this.insumoForm.markAllAsTouched();
      return;
    }

    const payload = this.insumoForm.getRawValue(); // Incluye unidadId si está deshabilitado

    if (this.insumo) {
      this.insumoService.update(this.insumo.idInsumo, {
        nombre: payload.nombre,
        descripcion: payload.descripcion
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Insumo actualizado',
            text: 'Los datos fueron actualizados correctamente',
            confirmButtonColor: '#0062BA'
          });
          this.onInsumoGuardado.emit();
          this.insumoForm.reset();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el insumo',
            confirmButtonColor: '#dc3545'
          });
          console.error(err);
        }
      });
    } else {
      this.insumoService.create(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Insumo creado',
            text: 'El insumo fue registrado correctamente',
            confirmButtonColor: '#0062BA'
          });
          this.onInsumoGuardado.emit();
          this.insumoForm.reset();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el insumo: ' + err?.error?.message,
            confirmButtonColor: '#dc3545'
          });
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.onCancelar.emit();
  }

  campoInvalido(campo: string): boolean {
    const control = this.insumoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}
