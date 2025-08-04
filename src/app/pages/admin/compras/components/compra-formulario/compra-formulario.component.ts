import { InsumoService } from './../../../insumos/service/insumo.service';
import { ProveedorService } from './../../../proveedores/services/proveedores.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../services/compras.service';
import { CompraCreateRequest, CompraDetalleCreateRequest } from '../../interface/compra-create.interface';
import { Insumo } from '../../../insumos/interface/insumo.interface';
import { Proveedor } from '../../../proveedores/interface/proveedor.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-compra-formulario',
  templateUrl: './compra-formulario.component.html',
  standalone: false,
  styleUrl: './compra-formulario.component.css'
})
export class CompraFormularioComponent implements OnInit {
  @Output() onCompraGuardada = new EventEmitter<void>(); // <--- Este es el que se emite al guardar
  @Output() onCancelar = new EventEmitter<void>();

  form: FormGroup;
  detalles: CompraDetalleCreateRequest[] = [];

  nombreProveedorSeleccionado: string = '';
  detalleNombreInsumo: string = '';

  detalle: CompraDetalleCreateRequest = {
    insumoId: 0,
    presentacion: '',
    precioUnitario: 0,
    cantidad: 0
  };

  proveedores: Proveedor[] = [];
  insumos: Insumo[] = [];

  constructor(
    private fb: FormBuilder,
    private compraService: CompraService,
    private proveedorService: ProveedorService,
    private insumoService: InsumoService
  ) {
    this.form = this.fb.group({
      proveedorId: [null, Validators.required],
      observacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarInsumos();
  }

  cargarProveedores(): void {
    this.proveedorService.getAll().subscribe({
      next: res => this.proveedores = res,
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los proveedores',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  cargarInsumos(): void {
    this.insumoService.getAll().subscribe({
      next: res => this.insumos = res,
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

  onProveedorInput(nombre: string): void {
    this.nombreProveedorSeleccionado = nombre;
    const proveedor = this.proveedores.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (proveedor) {
      this.form.get('proveedorId')?.setValue(proveedor.idProveedor);
    } else {
      this.form.get('proveedorId')?.reset();
    }
  }

  onInsumoInput(nombre: string): void {
    this.detalleNombreInsumo = nombre;
    const insumo = this.insumos.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());
    if (insumo) {
      this.detalle.insumoId = insumo.idInsumo;
    } else {
      this.detalle.insumoId = 0;
    }
  }

  agregarDetalle(): void {
    this.detalles.push({ ...this.detalle });
    this.detalle = { insumoId: 0, presentacion: '', precioUnitario: 0, cantidad: 0 };
    this.detalleNombreInsumo = '';
  }

  eliminarDetalle(index: number): void {
    this.detalles.splice(index, 1);
  }

  detalleCompleto(): boolean {
    return (
      this.detalle.insumoId > 0 &&
      this.detalle.presentacion.trim() !== '' &&
      this.detalle.precioUnitario > 0 &&
      this.detalle.cantidad > 0
    );
  }

  obtenerNombreInsumo(id: number): string {
    const insumo = this.insumos.find(i => i.idInsumo === id);
    return insumo ? insumo.nombre : '';
  }

  calcularTotal(): number {
    return this.detalles.reduce((total, d) => total + (d.precioUnitario * d.cantidad), 0);
  }

  guardarCompra(): void {
    const payload: CompraCreateRequest = {
      proveedorId: this.form.value.proveedorId,
      observacion: this.form.value.observacion,
      detalles: this.detalles
    };

    this.compraService.crearCompra(payload).subscribe({
      next: res => {
        Swal.fire({
          icon: 'success',
          title: 'Compra creada',
          text: 'La compra fue registrada correctamente',
          confirmButtonColor: '#0062BA'
        });
        this.onCompraGuardada.emit(); // <--- Emitimos evento al padre (para ocultar formulario y recargar tabla)
        this.resetFormulario();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la compra: ' + err?.error?.message,
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  resetFormulario(): void {
    this.form.reset();
    this.detalles = [];
    this.nombreProveedorSeleccionado = '';
    this.detalleNombreInsumo = '';
  }
}
