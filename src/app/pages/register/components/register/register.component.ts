import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { CotizacionService } from '../../../home/cotizacion/services/cotizacion.service';
import { Productos } from '../../../admin/productos/interface/productos';
import { Router } from '@angular/router';

type RegistrarAnonimoResp = {
  creado: boolean;
  usuario: {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    rol: 'anonimo' | 'cliente' | 'admin' | string;
  } | null;
  message?: string;
};

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // gating: primero registro, luego cotizador
  mostrarCotizador = false;

  // para mostrar info del usuario anónimo en el cotizador
  usuarioAnonimo: { nombre: string; apellidos: string; email: string } | null =
    null;

  // formulario de registro
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // catálogo para las cards
  productos: Productos[] = [];
  loadingProductos = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private cotizacionService: CotizacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si ya hay usuarioId en localStorage, mostramos cotizador directo
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      this.mostrarCotizador = true;
      // si guardamos info de anónimo anteriormente, recupérala para el banner
      const anonNombre = localStorage.getItem('anon_nombre') || '';
      const anonApellidos = localStorage.getItem('anon_apellidos') || '';
      const anonEmail = localStorage.getItem('anon_email') || '';
      if (anonNombre || anonApellidos || anonEmail) {
        this.usuarioAnonimo = {
          nombre: anonNombre,
          apellidos: anonApellidos,
          email: anonEmail,
        };
      }
    }
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.loadingProductos = true;
    this.cotizacionService.allProducts().subscribe({
      next: (data) => {
        this.productos = data || [];
        this.loadingProductos = false;
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
        this.errorMessage = 'No se pudieron cargar los productos';
        this.loadingProductos = false;
        Swal.fire('Error', this.errorMessage, 'error');
      },
    });
  }

  registrarUsuario(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const v = this.formulario.value;

    this.userService
      .registrarOVerificarAnonimo({
        email: v.email ?? '',
        nombre: v.nombre ?? '',
        apellidos: v.apellidos ?? '',
      })
      .subscribe({
        next: (resp: RegistrarAnonimoResp) => {
          // Caso: usuario existente y NO anónimo
          if (resp.creado === false && !resp.usuario) {
            Swal.fire({
              icon: 'info',
              title: 'Usuario ya existe',
              text: resp.message || 'El usuario ya existe pero no es anónimo.',
              showCancelButton: true,
              confirmButtonText: 'Iniciar sesión',
              cancelButtonText: 'Cerrar',
            }).then((r) => {
              if (r.isConfirmed) this.router.navigate(['/login']);
            });
            return;
          }

          // Caso: usuario anónimo existente o recién creado
          const u = resp.usuario;
          if (u && u.id) {
            // guardamos identidad mínima para el cotizador
            localStorage.setItem('usuarioId', u.id);
            localStorage.setItem('usuarioEmail', u.email || '');

            // si es anónimo, mostramos un banner con sus datos
            if (u.rol === 'anonimo') {
              this.usuarioAnonimo = {
                nombre: u.nombre || (v.nombre ?? ''),
                apellidos: u.apellidos || (v.apellidos ?? ''),
                email: u.email || (v.email ?? ''),
              };
              // persistimos para mostrar si recarga
              localStorage.setItem('anon_nombre', this.usuarioAnonimo.nombre);
              localStorage.setItem(
                'anon_apellidos',
                this.usuarioAnonimo.apellidos
              );
              localStorage.setItem('anon_email', this.usuarioAnonimo.email);
            } else {
              // si no es anónimo (por si el backend te lo regresa igual), limpiamos banner
              this.usuarioAnonimo = null;
              localStorage.removeItem('anon_nombre');
              localStorage.removeItem('anon_apellidos');
              localStorage.removeItem('anon_email');
            }

            this.mostrarCotizador = true;
            Swal.fire({
              icon: 'success',
              title: resp.message || 'Listo',
              text:
                u.rol === 'anonimo'
                  ? 'Usaremos tu usuario temporal para crear la cotización.'
                  : 'Continuemos con tu cotización.',
              timer: 1400,
              showConfirmButton: false,
            });
          } else {
            throw new Error('El servidor no devolvió un usuario válido');
          }
        },
        error: () => {
          Swal.fire(
            'Error',
            'No se pudo verificar/registrar el usuario',
            'error'
          );
        },
      });
  }

  // badges visuales
  esMasVendido(i: number): boolean {
    return i === 0;
  }
  esNuevo(i: number): boolean {
    return i === 2;
  }
}
