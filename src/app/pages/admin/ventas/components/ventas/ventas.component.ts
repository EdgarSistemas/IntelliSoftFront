import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  standalone:false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
ventas = [
{
id: 1,
fecha: '2023-03-10',
total: 100.99,
productos: [
{ nombre: 'Invernadero Acuapónico', cantidad: 1 },
{ nombre: 'Accesorios básicos', cantidad: 1 }
],
estado: 'Enviado'
},
];

constructor() { }

ngOnInit(): void {
}

detalleVenta(venta: any) {
console.log('Detalle venta:', venta);
// Aquí conectarás con tu API para mostrar el detalle
}
}
