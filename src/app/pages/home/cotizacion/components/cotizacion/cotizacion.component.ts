import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-cotizacion',
  standalone:false,
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
      $('#cotizacionModal').modal('show');
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }
}