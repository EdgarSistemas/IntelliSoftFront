import { Component } from '@angular/core';
import { CotizacionService } from '../../../../home/cotizacion/services/cotizacion.service';
import { Productos } from '../../../../admin/productos/interface/productos';

@Component({
  selector: 'app-products',
  standalone:false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
productos: Productos[] = [];
  loading = true;
  errorMessage = '';

  constructor(private CotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.CotizacionService.allProducts().subscribe({
      next: (response: Productos[]) => {
        this.productos = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.errorMessage = 'No se pudieron cargar los productos';
        this.loading = false;
      }
    });
  }

  // Método para determinar si mostrar el badge "Más vendido"
  esMasVendido(index: number): boolean {
    return index === 0; // Mostrar solo en el primer producto como ejemplo
  }

  // Método para determinar si mostrar el badge "Nuevo"
  esNuevo(index: number): boolean {
    return index === 2; // Mostrar solo en el tercer producto como ejemplo
  }
}
