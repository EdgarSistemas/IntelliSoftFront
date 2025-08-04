import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
     email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/.*[!@#$%^&*.].*/) // Al menos un símbolo
      ]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid){
      this.showValidationErrors();
      return;
    }


    this.loading = true;

    const { email, password } = this.loginForm.value;
    this.authService.login({
    email: email!,
    password: password!
});
  }
 private showValidationErrors() {
    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    this.loading = false;
  this.loginForm.get('password')?.reset();
  }
}
