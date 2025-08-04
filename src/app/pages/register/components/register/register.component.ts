import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CotizacionService } from '../../../home/cotizacion/services/cotizacion.service';
import { User } from '../../interface/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Productos } from '../../../admin/productos/interface/productos';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
 // Primer formulario (registro)
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl(''),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    password: new FormControl('123Abc$'),
    rol: new FormControl('anonimo', [Validators.required]),
  });

  // Segundo formulario (cotización)
  formularioCotizacion = new FormGroup({
    idUsuario: new FormControl('', [Validators.required]),
    producto: new FormControl(''),
    hectareas: new FormControl(0, [Validators.required, Validators.min(1)]),
    detalles: new FormControl(''),
  });

  productos: Productos[] = [];
  usuarioId: string | null = null;
  productoIdSeleccionado: number | null = null;

  constructor(
    private userService: UserService,
    private CotizacionService: CotizacionService
  ) {}

  ngOnInit(): void {
    this.CotizacionService.allProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'No se pudieron cargar los productos. Por favor, recarga la página.',
        });
      },
    });

  }

  // Se activa al dar clic en el botón "Continuar" del formulario de registro
  registrarUsuario() {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      const user: User = {
        id: '', // Este campo se llenará después de registrar al usuario
        nombre: formValue.nombre ?? '',
        apellidos: formValue.apellidos ?? '',
        email: formValue.email ?? '',
        direccion: formValue.direccion ?? '',
        phoneNumber: formValue.phoneNumber ?? '',
        password: formValue.password ?? '123Abc$',
        rol: formValue.rol ?? 'anonimo',
      };

      this.userService.registrarUsuario(user).subscribe({
        next: (response) => {
          const usuarioRegistrado = response.id;
          console.log('Usuario registrado con éxito', response);
          // Asumimos que la API devuelve el ID del nuevo usuario en la respuesta.
          this.usuarioId = response.id; 
          
          if (this.usuarioId) {
            // Guardamos el ID en el localStorage.
            localStorage.setItem('usuarioId', this.usuarioId);
            
            // Asignamos el ID al campo oculto del formulario de cotización.
            this.formularioCotizacion.patchValue({ idUsuario: this.usuarioId });
            
            // Ocultamos el formulario de registro y mostramos el de cotización.
            this.mostrarFormularioCotizacion();
          } else {
            Swal.fire('Error', 'No se pudo obtener el ID del usuario. Por favor, intenta de nuevo.', 'error');
          }
        },
        error: (error) => {
          console.error('Error al registrar el usuario', error);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.',
          });
        },
      });
    }
  }

  // Nueva función para obtener la lista de productos
  allProducts() {
    this.CotizacionService.allProducts().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'No se pudieron cargar los productos. Por favor, recarga la página.',
        });
      },
    });
  }

   enviarCotizacion() {
    if (this.formularioCotizacion.valid) {
      const cotizacionData = this.formularioCotizacion.value;
    
      console.log('Cotización enviada:', cotizacionData);
      Swal.fire('¡Éxito!', 'Tu cotización ha sido enviada.', 'success');
      this.formularioCotizacion.reset();
      localStorage.removeItem('usuarioId');
    }
    else {
      Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
      console.error('Formulario de cotización inválido', this.formularioCotizacion.errors);
      // Aquí podrías agregar lógica adicional para manejar errores específicos del formulario
      this.formularioCotizacion.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }

  mostrarFormularioCotizacion() {
    const registroDiv = document.getElementById('formulario-registro');
    const cotizacionDiv = document.getElementById('formulario-cotizacion');
    if (registroDiv && cotizacionDiv) {
      // Usamos las clases de Bootstrap para ocultar y mostrar
      registroDiv.classList.add('d-none');
      cotizacionDiv.classList.remove('d-none');
    }
  }

  seleccionarProducto(producto: any) {
  if (producto && producto.idProductos) {
    this.productoIdSeleccionado = producto.idProductos;
    console.log('Producto seleccionado:', this.productoIdSeleccionado);
  } else {
    console.error("El producto o su ID no están definidos.");
    this.productoIdSeleccionado = null;
  }
}
}