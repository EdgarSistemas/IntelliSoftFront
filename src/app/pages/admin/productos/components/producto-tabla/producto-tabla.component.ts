import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { ProductoResumen } from '../../interface/producto.interface';

@Component({
  selector: 'admin-producto-tabla',
  templateUrl: './producto-tabla.component.html',
  styleUrl: './producto-tabla.component.css',
  standalone: false,
})
export class ProductoTablaComponent implements OnInit {
  productos: ProductoResumen[] = [];
  productosFiltrados: ProductoResumen[] = [];
  filtro = '';
  isLoading = false;
  mostrarFormulario = false;
  productoEnEdicionId: number | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      },
    });
  }

  filtrar(): void {
    const texto = this.filtro.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(texto) ||
        p.descripcion?.toLowerCase().includes(texto)
    );
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onProductoGuardado(): void {
    this.mostrarFormulario = false;
    this.cargarProductos();
  }

  confirmarEliminacion(id: number): void {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción desactivará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: (res) => {
            Swal.fire('Eliminado', res.message, 'success');
            this.cargarProductos();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
          },
        });
      }
    });
  }

  editarProducto(id: number): void {
    this.productoEnEdicionId = id;
    this.mostrarFormulario = false;
  }

  onProductoEditado(): void {
    this.productoEnEdicionId = null;
    this.cargarProductos();
  }

  cancelarEdicion(): void {
    this.productoEnEdicionId = null;
  }
}
