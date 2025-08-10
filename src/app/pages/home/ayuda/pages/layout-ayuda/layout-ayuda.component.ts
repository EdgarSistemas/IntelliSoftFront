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
      answer: "Puedes restablecer tu contraseña enviando un correo electrónico a intellisoft@intellisoft.com"
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
      question: "¿Cómo realizo una cotización?",
      answer: "Navega hasta el apartado Cotizar ingresa algunos datos y si tu cotización es aceptada recibiras un correo electronico con la información"
    }
  ];
}
