import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-ayuda',
  standalone:false,
  templateUrl: './layout-ayuda.component.html',
  styleUrl: './layout-ayuda.component.css'
})
export class LayoutAyudaComponent {
faqs = [
    {
      question: "¿Cómo restablezco mi contraseña?",
      answer: "Puedes restablecer tu contraseña desde la página de login haciendo clic en '¿Olvidaste tu contraseña?' y siguiendo las instrucciones que recibirás por correo."
    },
    {
      question: "¿El sistema requiere instalación?",
      answer: "Nuestro software es 100% en la nube, solo necesitas un navegador moderno y conexión a internet para acceder."
    },
    {
      question: "¿Qué navegadores son compatibles?",
      answer: "Recomendamos usar Chrome, Firefox o Edge en sus versiones más recientes para mejor rendimiento."
    },
    {
      question: "¿Cómo actualizo a la versión premium?",
      answer: "Desde tu panel de control, ve a 'Configuración de cuenta' y selecciona 'Actualizar plan' para ver las opciones disponibles."
    }
  ];
}
