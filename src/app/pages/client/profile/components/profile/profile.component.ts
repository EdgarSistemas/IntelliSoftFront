import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {



clientData = {
    name: 'Ing. Fernando García',
    email: 'fernando.garcia@agrotec.com.mx',
    phone: '+52 55 9876 5432',
    company: 'AgroTec Solutions',
    type: 'Premium',
    joinDate: '2022-03-15',
    address: 'Av. Tecnológico 1234, Col. Innovación',
    city: 'Guadalajara',
    state: 'Jalisco',
    zipCode: '44100',
    country: 'México',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  };

  // Historial de compras
  purchaseHistory = [
    {
      orderNumber: 'INT-2023-001',
      date: '2023-06-10',
      status: 'completed',
      product: {
        name: 'Invernadero Acuapónico IntelliSoft Pro',
        description: 'Sistema completo de acuaponía con automatización IoT',
        type: 'Modelo Pro',
        price: 45000
      },
      total: 44200
    },
    // ... más compras ...
  ];

  // Proyectos de invernaderos
  aquaponicProjects = [
    {
      id: 'PROJ-001',
      name: 'Invernadero Principal',
      model: 'IntelliSoft Pro',
      status: 'active',
      installationDate: '2023-07-15',
      lastMaintenance: '2023-12-10',
      estimatedProduction: '200kg/mes',
      image: 'assets/images/project1.jpg'
    },
    // ... más proyectos ...
  ];

  // Tickets de soporte
  supportTicketsList = [
    {
      id: 'TICK-001',
      subject: 'Problema con sensores de pH',
      project: 'Invernadero Principal',
      status: 'resolved',
      date: '2023-11-05'
    },
    // ... más tickets ...
  ];

  // Estadísticas
  totalSpent = 125700;
  activeProjects = 2;
  supportTickets = this.supportTicketsList.length;

  constructor() { }

  ngOnInit(): void {
  }

  // Métodos de acciones
  editProfile(): void {
    console.log('Editar perfil');
    // Lógica para editar perfil
  }

  registerNewProject(): void {
    console.log('Registrar nuevo proyecto');
    // Lógica para nuevo proyecto
  }

  viewProjectDetails(project: any): void {
    console.log('Ver detalles del proyecto', project);
    // Lógica para ver detalles
  }

  requestMaintenance(project: any): void {
    console.log('Solicitar mantenimiento para', project);
    // Lógica para solicitar mantenimiento
  }

  createNewTicket(): void {
    console.log('Crear nuevo ticket');
    // Lógica para nuevo ticket
  }

  viewTicket(ticket: any): void {
    console.log('Ver ticket', ticket);
    // Lógica para ver ticket
  }
}
