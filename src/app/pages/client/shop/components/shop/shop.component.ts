import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProfileService } from '../../../profile/services/profile.service';
import { ShopService } from '../../services/shop.service';
import { Profile } from '../../../profile/interface/profile';
import { PedidoResponse, Opinion } from '../../interface/shop';
import { Pedido } from '../../../../admin/ventas/interface/ventas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  standalone:false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  details: Profile | null = null; 
  pedidos: PedidoResponse[] = [];
  cargando = true;
  modalAbierto = false;
  nuevaOpinion: Opinion = {
    productoId: 0,
    calificacion: 5,
    comentario: ''
  };
  activePanelIndex: number | null = null;

  constructor(
    private profileService: ProfileService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.cargarDataProfile();
    this.obtenerPedidosUsuario();
  }

  cargarDataProfile(): void {
    this.profileService.getUserDetail().subscribe({
      next: (data) => {
        this.details = data;
        console.log('Datos recibidos:', this.details);
      },
      error: (err) => console.error('Error:', err)
    });
  }

  obtenerPedidosUsuario(): void {
    this.shopService.getPedidosPorUsuario().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar pedidos del usuario:', err);
        this.cargando = false;
      }
    });
  }

  getTotalPedido(pedido: PedidoResponse): number {
    const totalBase = pedido.detalles.reduce((total, item) => total + item.subtotal, 0);
    const ganancia = totalBase * (pedido.porcentajeGanancia / 100);
    return totalBase + ganancia;
  }
  getNombreEstatus(estatus: number): string {
    switch (estatus) {
      case 1: return 'Pendiente';
      case 2: return 'En Proceso';
      case 3: return 'Completado';
      default: return 'Desconocido';
    }
  }

  abrirModal(productoId: number) {
    this.modalAbierto = true;
    this.nuevaOpinion = {
      productoId,
      calificacion: 5,
      comentario: ''
    };
  }


  cerrarModal() {
    this.modalAbierto = false;
  }


  enviarOpinion() {
  this.shopService.crearOpinion(this.nuevaOpinion).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Opinión enviada',
        text: 'Gracias por tu comentario.',
        confirmButtonText: 'Aceptar'
      });
      
      // Cierra el modal
          this.cerrarModal();

          // Reiniciar el formulario
          this.nuevaOpinion = { productoId: 0, calificacion: 5, comentario: '' };
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar la opinión.',
            confirmButtonText: 'Aceptar'
          });
          console.error(err);
        }
      });
    }

    

    // Método para manejar el toggle
    togglePanel(index: number): void {
      this.activePanelIndex = this.activePanelIndex === index ? null : index;
    }



}

