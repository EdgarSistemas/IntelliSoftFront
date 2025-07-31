import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone:false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
productos = [
    { id: 1, nombre: 'Invernadero Acuapónico', precio: 100.99, descripcion: 'Invernadero para cultivo acuapónico' },
    { id: 2, nombre: 'Accesorios básicos', precio: 20.99, descripcion: 'Accesorios para invernadero acuapónico' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  editarProducto(producto: any) {
    console.log('Editar producto:', producto);
    // Aquí conectarás con tu API para editar el producto
  }

  eliminarProducto(producto: any) {
    console.log('Eliminar producto:', producto);
    // Aquí conectarás con tu API para eliminar el producto
  }
}
