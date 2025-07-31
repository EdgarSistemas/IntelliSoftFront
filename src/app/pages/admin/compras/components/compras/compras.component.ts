import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-compras',
  standalone:false,
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {
formulario = new FormGroup({
fecha: new FormControl('', Validators.required),
proveedor: new FormControl('', Validators.required),
insumo: new FormControl('', Validators.required),
cantidad: new FormControl('', Validators.required),
costoUnitario: new FormControl('', Validators.required)
});
constructor() { }
ngOnInit(): void {
}
agregarCompra() {
console.log('Agregar compra:', this.formulario.value);
// Aquí conectarás con tu API para agregar la compra
}
}
