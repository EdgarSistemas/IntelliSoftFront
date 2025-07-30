import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-layout-cotizacion',
  standalone:false,
  templateUrl: './layout-cotizacion.component.html',
  styleUrl: './layout-cotizacion.component.css'
})
export class LayoutCotizacionComponent {
  private modal: bootstrap.Modal | undefined;
  cotizacionForm;

  constructor(private fb: FormBuilder, private router: Router) {
    this.modal = undefined;
    this.cotizacionForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      company: ['', [Validators.required, Validators.minLength(2)]],
      plantType: ['', Validators.required],
      hectares: [null, [Validators.required, Validators.min(1)]],
      activePonds: ['', Validators.required],
      currentSystem: ['', Validators.required],
      additionalDetails: ['']
    });
  }
  onSubmit() {
    if (this.cotizacionForm.valid) {
      const modalElement = document.getElementById('confirmationModal');
      this.modal = new bootstrap.Modal(modalElement!);
      this.modal.show();
    }
  }

  navigateToHome() {
    if (this.modal) {
      this.modal.hide(); // Cierra el modal primero
    }
    this.router.navigate(['/inicio']);
  }
}

