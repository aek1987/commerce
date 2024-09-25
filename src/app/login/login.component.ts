import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service'; // Service d'authentification
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      response => {
        // Si la connexion est réussie, redirigez l'utilisateur vers la page principale
        this.router.navigate(['/']);
      },
      error => {
        console.error('Erreur de connexion', error);
      }
    );
  }
}
