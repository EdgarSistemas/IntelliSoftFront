import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedores.service';
import { Proveedor } from '../../interface/proveedor.interface';

@Component({
  selector: 'admin-proveedor-table',
  templateUrl: './proveedor-tabla.component.html',
  standalone: false
})
export class ProveedorTableComponent implements OnInit {
  proveedores: Proveedor[] = [];
  mostrarFormulario = false;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedorService.getAll().subscribe(data => {
      this.proveedores = data;
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onProveedorCreado(): void {
    this.loadProveedores();
    this.mostrarFormulario = false;
  }
}
