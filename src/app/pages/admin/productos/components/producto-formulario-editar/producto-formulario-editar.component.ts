import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import {
  ProductoDetalle,
  ProductoInsumoCreate,
} from '../../interface/producto.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-producto-formulario-editar',
  standalone: false,
  templateUrl: './producto-formulario-editar.component.html',
  styleUrl: './producto-formulario-editar.component.css',
})
export class ProductoFormularioEditarComponent {
  @Input() idProducto!: number;
  @Output() onProductoActualizado = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  formulario!: FormGroup;
  producto!: ProductoDetalle;
  insumosEditables: ProductoInsumoCreate[] = [];

  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      porcentajeGanancia: [0, [Validators.required, Validators.min(0)]],
      porcentajeRiesgo: [0, [Validators.required, Validators.min(0)]],
    });

    this.cargarProducto();
  }

  cargarProducto(): void {
    this.isLoading = true;
    this.productoService.obtenerProductoPorId(this.idProducto).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.insumosEditables = producto.insumos.map((i) => ({
          insumoId: i.insumoId,
          cantidad: i.cantidad,
        }));

        this.formulario.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          porcentajeGanancia: producto.porcentajeGanancia,
          porcentajeRiesgo: producto.porcentajeRiesgo,
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudo cargar el producto', 'error');
      },
    });
  }

  actualizarCantidad(insumoId: number, nuevaCantidad: number): void {
    const insumo = this.insumosEditables.find((i) => i.insumoId === insumoId);
    if (insumo) {
      insumo.cantidad = nuevaCantidad;
    }
  }

  guardarCambios(): void {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Completa los campos requeridos.', 'error');
      return;
    }

    const payload = {
      ...this.formulario.value,
      hectareaBase: this.producto.hectareaBase, // ✅ Se incluye manualmente aquí
      insumos: this.insumosEditables,
    };

    this.productoService
      .actualizarProducto(this.idProducto, payload)
      .subscribe({
        next: (res) => {
          Swal.fire('Éxito', res.message || 'Producto actualizado', 'success');
          this.onProductoActualizado.emit();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
        },
      });
  }

  cancelar(): void {
    this.onCancelar.emit();
  }

  obtenerUnidadSimbolo(insumoId: number): string {
    const insumo = this.producto?.insumos.find((i) => i.insumoId === insumoId);
    return insumo?.unidad?.simbolo || '';
  }

  obtenerNombreInsumo(insumoId: number): string {
    const insumo = this.producto?.insumos.find((i) => i.insumoId === insumoId);
    return insumo?.nombre || '';
  }
}
