import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'; // Importa AOS
import { AuthService } from './pages/login/services/auth.service';



@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public title = 'intelliSoft';
  isLoggedIn: boolean = false;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void{
    AOS.init();
    AOS.refresh();
    this.isLoggedIn = this.AuthService.isAuthenticated();
  }
}
