import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CotizacionService } from '../../../home/cotizacion/services/cotizacion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Productos } from '../../../admin/productos/interface/productos'; // Asegúrate de que esta ruta sea correcta
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

    productoSeleccionado: any;

 // Primer formulario (registro)
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    rol: new FormControl(''),
  });

  // Segundo formulario (cotización)
  formularioCotizacion = new FormGroup({
    idUsuario: new FormControl('', [Validators.required]),
     producto: new FormControl<number | null>(null, [Validators.required]),
    hectareas: new FormControl(0, [Validators.required, Validators.min(1)]),
    detalles: new FormControl(''),
  });

  productos: Productos[] = [];
  usuarioId: string | null = null;
  productoIdSeleccionado: number | null = null;
   loading = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private CotizacionService: CotizacionService
  ) {}

 ngOnInit(): void {
  // Cargar productos
  this.CotizacionService.allProducts().subscribe({
    next: (data) => this.productos = data,
    error: (error) => {
      console.error('Error al obtener productos', error);
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
    }
  });

  // Cargar usuarioId si existe
  const usuarioId = localStorage.getItem('usuarioId');
  if (usuarioId) {
    this.formularioCotizacion.patchValue({
      idUsuario: usuarioId
    });
  }
}


registrarUsuario() {
  if (this.formulario.valid) {
    const formValue = this.formulario.value;
    
    this.userService.registrarOVerificarAnonimo({
      email: formValue.email ?? '',
      nombre: formValue.nombre ?? '',
      apellidos: formValue.apellidos ?? ''
    }).subscribe({
      next: (response) => {
        // Verificar que el ID existe
        if (!response.usuario.id) {
          throw new Error('El servidor no devolvió un ID válido');
        }

        // Guardar en localStorage
        localStorage.setItem('usuarioId', response.usuario.id);
        localStorage.setItem('usuarioEmail', formValue.email ?? '');
        
        // Actualizar formulario de cotización
        this.formularioCotizacion.patchValue({
          idUsuario: response.usuario.id
        });

        console.log('Usuario ID:', response.usuario.id); // Para depuración
        this.mostrarFormularioCotizacion();
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo verificar/registrar el usuario', 'error');
      }
    });
  }
}
 
  

enviarCotizacion() {
  if (this.formularioCotizacion.valid && this.productoIdSeleccionado) {
    const usuarioId = localStorage.getItem('usuarioId');
    
    if (!usuarioId) {
      Swal.fire('Error', 'No se encontró el ID de usuario', 'error');
      return;
    }

    const cotizacionData = {
      productoId: this.productoIdSeleccionado,
      hectareas: this.formularioCotizacion.value.hectareas || 0,
      usuarioId: usuarioId,
      detalleCotizacion: this.formularioCotizacion.value.detalles || ''
    };

    console.log('Datos a enviar:', cotizacionData);

    this.CotizacionService.enviarCotizacion(cotizacionData).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Cotización enviada correctamente', 'success');
        this.formularioCotizacion.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo enviar la cotización', 'error');
      }
    });
  } else {
    Swal.fire('Error', 'Completa todos los campos y selecciona un producto', 'error');
    this.formularioCotizacion.markAllAsTouched();
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
 seleccionarProducto(producto: Productos) {
  if (producto?.idProductos) {
    this.productoIdSeleccionado = producto.idProductos;
    
    // Actualizar el formulario con el producto seleccionado
    this.formularioCotizacion.patchValue({
      producto: producto.idProductos
    });
    
    console.log('Producto seleccionado:', producto.idProductos);
  } else {
    console.error("Producto no válido");
    this.productoIdSeleccionado = null;
    this.formularioCotizacion.patchValue({ producto: null });
  }
}

esMasVendido(index: number): boolean {
    return index === 0; // Mostrar solo en el primer producto como ejemplo
  }

  // Método para determinar si mostrar el badge "Nuevo"
  esNuevo(index: number): boolean {
    return index === 2; // Mostrar solo en el tercer producto como ejemplo
  }

}

  

