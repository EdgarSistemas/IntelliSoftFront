import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { InsumoService } from '../../../insumos/service/insumo.service';
import { ProductoService } from '../../services/producto.service';
import { Insumo } from '../../../insumos/interface/insumo.interface';
import {
  ProductoCreateRequest,
  ProductoInsumoCreate
} from '../../interface/producto.interface';

@Component({
  selector: 'admin-producto-formulario',
  templateUrl: './producto-formulario.component.html',
  standalone: false,
  styleUrl: './producto-formulario.component.css'
})
export class ProductoFormularioComponent implements OnInit {
  @Output() onProductoCreado = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  formulario!: FormGroup;

  insumos: Insumo[] = [];
  insumosAgregados: ProductoInsumoCreate[] = [];

  nombreInsumoSeleccionado: string = '';
  cantidadInsumo: number | null = null;

  constructor(
    private fb: FormBuilder,
    private insumoService: InsumoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      hectareaBase: [0, [Validators.required, Validators.min(0.01)]],
      porcentajeGanancia: [0, [Validators.required, Validators.min(0)]],
      porcentajeRiesgo: [0, [Validators.required, Validators.min(0)]]
    });

    this.cargarInsumos();
  }

  cargarInsumos(): void {
    this.insumoService.getAll().subscribe({
      next: (res) => (this.insumos = res),
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los insumos',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  onInsumoInput(nombre: string): void {
    this.nombreInsumoSeleccionado = nombre;
    const insumo = this.insumos.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());
    if (insumo) {
      if (!this.insumosAgregados.some(i => i.insumoId === insumo.idInsumo)) {
        this.agregarInsumoConId(insumo.idInsumo);
      } else {
        Swal.fire('Advertencia', 'Este insumo ya fue agregado.', 'warning');
      }
    }
  }

  agregarInsumoConId(id: number): void {
    if (this.cantidadInsumo !== null && this.cantidadInsumo > 0) {
      this.insumosAgregados.push({
        insumoId: id,
        cantidad: this.cantidadInsumo
      });
      this.nombreInsumoSeleccionado = '';
      this.cantidadInsumo = null;
    }
  }

  puedeAgregarInsumo(): boolean {
    const insumo = this.insumos.find(i => i.nombre.toLowerCase() === this.nombreInsumoSeleccionado.toLowerCase());
    return !!insumo && this.cantidadInsumo !== null && this.cantidadInsumo > 0 &&
           !this.insumosAgregados.some(i => i.insumoId === insumo.idInsumo);
  }

  agregarInsumo(): void {
    const insumo = this.insumos.find(i => i.nombre.toLowerCase() === this.nombreInsumoSeleccionado.toLowerCase());
    if (insumo) {
      this.agregarInsumoConId(insumo.idInsumo);
    }
  }

  eliminarInsumo(insumoId: number): void {
    this.insumosAgregados = this.insumosAgregados.filter(i => i.insumoId !== insumoId);
  }

  obtenerNombreInsumo(id: number): string {
    const insumo = this.insumos.find(i => i.idInsumo === id);
    return insumo ? insumo.nombre : '';
  }

  obtenerUnidadInsumo(id: number): string {
    const insumo = this.insumos.find(i => i.idInsumo === id);
    return  insumo?.unidad?.nombre + " (" + insumo?.unidad?.simbolo + ")" || '';
  }

  guardarProducto(): void {
    if (this.formulario.invalid || this.insumosAgregados.length === 0) {
      Swal.fire('Error', 'Completa el formulario y agrega al menos un insumo.', 'error');
      return;
    }

    const payload: ProductoCreateRequest = {
      ...this.formulario.value,
      insumos: this.insumosAgregados
    };

    this.productoService.crearProducto(payload).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: res.message || 'Producto creado correctamente',
          confirmButtonColor: '#0062BA'
        });
        this.resetFormulario();
        this.onProductoCreado.emit();
      },
      error: (err) => {
        Swal.fire('Error', err?.error?.message || 'No se pudo crear el producto', 'error');
      }
    });
  }

  cancelar(): void {
    this.resetFormulario();
    this.onCancelar.emit();
  }

  resetFormulario(): void {
    this.formulario.reset();
    this.insumosAgregados = [];
    this.nombreInsumoSeleccionado = '';
    this.cantidadInsumo = null;
  }
}
