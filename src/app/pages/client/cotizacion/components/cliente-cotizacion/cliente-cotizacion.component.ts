import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cliente-cotizacion',
  standalone: false,
  templateUrl: './cliente-cotizacion.component.html',
  styleUrl: './cliente-cotizacion.component.css'
})
export class ClienteCotizacionComponent {
// Datos del cliente (simulados - en producción vendrían de tu API)
  clientData = {
    id: '12345',
    name: 'Juan Pérez',
    email: 'juan.perez@empresa.com',
    company: 'AgroTech Solutions'
  };

  // Número de cotización (simulado)
  quoteNumber = 'COT-' + Math.floor(100000 + Math.random() * 900000);

  // Productos disponibles (simulados - en producción vendrían de tu API)
  products = [
    {
      id: 'AQP-1000',
      name: 'AquaPro 3000',
      description: 'Sistema acuapónico premium con automatización IoT',
      price: 24999,
      image: 'assets/img/products/aqua-pro.jpg',
      features: [
        'Para 1-2 hectáreas',
        'Monitoreo remoto',
        'Control automático de parámetros',
        'Garantía de 2 años'
      ]
    },
    // Agregar más productos según sea necesario
  ];

  // Costos adicionales
  installationCost = 5000;
  maintenanceCost = 3000;

  // Variables del formulario
  quoteForm: FormGroup;
  selectedProduct: any = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.quoteForm = this.fb.group({
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      cropType: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(10)]],
      requirements: [''],
      installation: [false],
      maintenance: [false]
    });
  }

  ngOnInit(): void {
    // Aquí iría la llamada a tu API para cargar datos iniciales si es necesario
    // Ejemplo:
    // this.loadClientData();
    // this.loadProducts();
  }

  updateProductDetails(): void {
    const selectedProductId = this.quoteForm.get('product')?.value;
    this.selectedProduct = this.products.find(p => p.id === selectedProductId?.id);
  }

  calculateTotal(): number {
    if (!this.selectedProduct) return 0;
    
    const quantity = this.quoteForm.get('quantity')?.value || 1;
    let total = this.selectedProduct.price * quantity;
    
    if (this.quoteForm.get('installation')?.value) {
      total += this.installationCost;
    }
    
    if (this.quoteForm.get('maintenance')?.value) {
      total += this.maintenanceCost;
    }
    
    return total;
  }

  saveDraft(): void {
    // Lógica para guardar borrador en API
    console.log('Guardando borrador:', this.quoteForm.value);
    // Ejemplo de llamada a API:
    // this.quoteService.saveDraft(this.quoteForm.value).subscribe(...);
  }

  generateQuote(): void {
    if (this.quoteForm.invalid) return;
    
    this.loading = true;
    const quoteData = {
      ...this.quoteForm.value,
      client: this.clientData,
      total: this.calculateTotal(),
      quoteNumber: this.quoteNumber
    };
    
    // Simulación de llamada a API
    console.log('Enviando a API:', quoteData);
    /*
    this.quoteService.generateQuote(quoteData).subscribe({
      next: (response) => {
        // Redirigir a vista de cotización generada
        this.router.navigate(['/cliente/cotizaciones', response.id]);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
    */
    
    // Simulación de respuesta
    setTimeout(() => {
      this.loading = false;
      // this.router.navigate(['/cliente/cotizaciones', '123']);
    }, 1500);
  }
}

