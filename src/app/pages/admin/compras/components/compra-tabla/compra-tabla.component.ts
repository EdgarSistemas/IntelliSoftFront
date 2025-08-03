import { CompraResumen } from './../../interface/compra.interface';
import { CompraService } from './../../services/compras.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-compra-tabla',
  standalone: false,
  templateUrl: './compra-tabla.component.html',
  styleUrls: ['./compra-tabla.component.css']
})
export class CompraTablaComponent implements OnInit {
  compras: CompraResumen[] = [];
  comprasFiltradas: CompraResumen[] = [];
  filtro = '';
  isLoading = false;
  mostrarFormulario = false;
  filtroEstatus: string = '';

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.isLoading = true;
    this.compraService.obtenerCompras().subscribe({
      next: (data) => {
        this.compras = data;
        this.comprasFiltradas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar las compras', 'error');
      }
    });
  }

  filtrarCompras(): void {
    const filtroTexto = this.filtro.toLowerCase().trim();
    this.comprasFiltradas = this.compras.filter(compra => {
      const coincideTexto = compra.claveCompra.toLowerCase().includes(filtroTexto)
        || compra.proveedor?.nombre?.toLowerCase().includes(filtroTexto)
        || compra.observacion?.toLowerCase().includes(filtroTexto);
      
      const coincideEstatus = this.filtroEstatus === ''
        || compra.estatus.toString() === this.filtroEstatus;
  
      return coincideTexto && coincideEstatus;
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onCompraGuardada(): void {
    this.mostrarFormulario = false;
    this.cargarCompras();
  }

  verDetalle(id: number): void {
    // Puedes usar modal, ruta o diálogo aquí según tu diseño
    console.log('Detalle compra', id);
  }

  cancelarCompra(id: number): void {
    Swal.fire({
      title: '¿Cancelar compra?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this.compraService.cancelarCompra(id).subscribe({
          next: () => {
            Swal.fire('Cancelada', 'La compra fue cancelada correctamente', 'success');
            this.cargarCompras();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo cancelar la compra', 'error');
          }
        });
      }
    });
  }

  inventariarCompra(id: number): void {
    // Este solo lanza un evento, puedes redirigir o mostrar modal
    console.log('Inventariar compra', id);
    // Ejemplo: this.router.navigate(['/admin/compras/inventariar', id]);
  }
}