import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-shop',
  standalone:false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  
  joinDate: Date | undefined = undefined;
// Datos del cliente (simulados)
  clientData = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    company: 'AgroTec S.A.',
    phone: '+52 55 1234 5678',
  };

  // Filtros
  dateFrom: string | null = null;
  dateTo: string | null = null;
  statusFilter: string = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 1;

  // Datos de compras simulados
  purchases = [
    {
      orderNumber: 'INT-2023-001',
      date: '2023-06-10',
      status: 'completed',
      product: {
        name: 'Invernadero Acuapónico IntelliSoft Pro',
        description: 'Sistema completo de acuaponía con automatización IoT para cultivos de alto rendimiento.',
        type: 'Modelo Pro',
        size: '6m x 4m',
        capacity: '200 peces + 50 plantas',
        image: 'https://via.placeholder.com/300x200?text=IntelliSoft+Pro'
      },
      subtotal: 45000,
      shipping: {
        address: 'Av. Revolución 123, Col. Centro',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '06000',
        method: 'Envío express',
        cost: 1200,
        status: 'Entregado'
      },
      discount: 2000,
      total: 44200,
      paymentMethod: 'credit_card'
    },
    {
      orderNumber: 'INT-2023-002',
      date: '2023-07-05',
      status: 'pending',
      product: {
        name: 'Invernadero Acuapónico IntelliSoft Basic',
        description: 'Sistema básico ideal para iniciar en la acuaponía con monitoreo básico.',
        type: 'Modelo Basic',
        size: '3m x 2m',
        capacity: '50 peces + 20 plantas',
        image: 'https://via.placeholder.com/300x200?text=IntelliSoft+Basic'
      },
      subtotal: 22000,
      shipping: null, // Recogida en tienda
      discount: 0,
      total: 22000,
      paymentMethod: 'bank_transfer'
    },
    {
      orderNumber: 'INT-2023-003',
      date: '2023-08-20',
      status: 'completed',
      product: {
        name: 'Kit de Expansión IoT IntelliSoft',
        description: 'Sensores adicionales y módulos de control para ampliar capacidades de tu invernadero.',
        type: 'Accesorio IoT',
        size: 'Kit',
        capacity: 'N/A',
        image: 'https://via.placeholder.com/300x200?text=Kit+IoT'
      },
      subtotal: 8500,
      shipping: {
        address: 'Calle Pino Suárez 456, Col. Del Valle',
        city: 'Monterrey',
        state: 'Nuevo León',
        zipCode: '64000',
        method: 'Envío estándar',
        cost: 350,
        status: 'Entregado'
      },
      discount: 500,
      total: 8350,
      paymentMethod: 'credit_card'
    },
    {
      orderNumber: 'INT-2023-004',
      date: '2023-09-12',
      status: 'cancelled',
      product: {
        name: 'Invernadero Acuapónico IntelliSoft Premium',
        description: 'Sistema premium con control climático avanzado y producción todo el año.',
        type: 'Modelo Premium',
        size: '8m x 6m',
        capacity: '500 peces + 150 plantas',
        image: 'https://via.placeholder.com/300x200?text=IntelliSoft+Premium'
      },
      subtotal: 68000,
      shipping: {
        address: 'Blvd. Díaz Ordaz 789, Col. Moderna',
        city: 'Guadalajara',
        state: 'Jalisco',
        zipCode: '44100',
        method: 'Envío express',
        cost: 1500,
        status: 'Cancelado'
      },
      discount: 0,
      total: 69500,
      paymentMethod: 'credit_card'
    }
  ];

  // Compras filtradas
  filteredPurchases = [...this.purchases];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.applyFilters();
  }

  // Aplicar filtros
  applyFilters(): void {
    this.filteredPurchases = this.purchases.filter(purchase => {
      // Filtro por fecha
      const purchaseDate = new Date(purchase.date);
      const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
      const toDate = this.dateTo ? new Date(this.dateTo) : null;
      
      const dateCondition = 
        (!fromDate || purchaseDate >= fromDate) && 
        (!toDate || purchaseDate <= toDate);
      
      // Filtro por estado
      const statusCondition = 
        !this.statusFilter || purchase.status === this.statusFilter;
      
      return dateCondition && statusCondition;
    });

    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Reiniciar filtros
  resetFilters(): void {
    this.dateFrom = null;
    this.dateTo = null;
    this.statusFilter = '';
    this.applyFilters();
  }

  // Calcular páginas totales
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredPurchases.length / this.itemsPerPage);
  }

  // Obtener páginas para la paginación
  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Cambiar página
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Cancelar orden
  cancelOrder(purchase: any): void {
    if (confirm(`¿Estás seguro de cancelar la orden ${purchase.orderNumber}?`)) {
      purchase.status = 'cancelled';
      alert(`Orden ${purchase.orderNumber} cancelada correctamente.`);
      this.applyFilters();
    }
  }

  // Descargar factura (simulado)
  downloadInvoice(purchase: any): void {
    alert(`Generando factura para la orden ${purchase.orderNumber}...`);
    // Aquí iría la lógica real para generar/descargar la factura
  }

  // Solicitar soporte (simulado)
  requestSupport(purchase: any): void {
    alert(`Soporte técnico solicitado para la orden ${purchase.orderNumber}. Nuestro equipo se pondrá en contacto contigo.`);
  }

  // Obtener compras paginadas
  get paginatedPurchases(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPurchases.slice(startIndex, startIndex + this.itemsPerPage);
  }
}

