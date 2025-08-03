import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedores.service';
import { Proveedor } from '../../interface/proveedor.interface';

@Component({
  selector: 'admin-proveedor-table',
  templateUrl: './proveedor-tabla.component.html',
  styleUrls: ['./proveedor-tabla.component.css'],
  standalone: false
})
export class ProveedorTableComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  mostrarFormulario = false;
  filtro: string = '';

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedorService.getAll().subscribe(data => {
      this.proveedores = data;
      this.proveedoresFiltrados = data;
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  onProveedorCreado(): void {
    this.loadProveedores();
    this.mostrarFormulario = false;
  }

  filtrarProveedores(): void {
  const filtroLower = this.filtro.toLowerCase().trim();

  this.proveedoresFiltrados = this.proveedores.filter(prov => {
    return Object.values(prov).some(valor => {
      if (valor === null || valor === undefined) return false;
      return valor.toString().toLowerCase().includes(filtroLower);
    });
  });
}
}
