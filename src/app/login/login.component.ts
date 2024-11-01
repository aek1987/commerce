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
    this.authService.login(this.loginData)
      .subscribe(
        (response: any) => {
          // Vérification de l'email et du mot de passe
          if (this.loginData.email === 'nekaaabdelakder1987@gmail.com' && this.loginData.password === 'nekaa') {
            localStorage.setItem('userRole', 'admin'); // Définir le rôle d'administrateur
          } else {
            localStorage.setItem('userRole', 'user'); // Définir un rôle par défaut pour les autres utilisateurs
          }

          this.router.navigate(['/product']);  // Rediriger après connexion
          alert('Login réussi');
        },
        (error) => {
          console.error('Login échoué', error);
          alert('Login échoué. Veuillez vérifier vos informations.');
        }
      );
  }
}
