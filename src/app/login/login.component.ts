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
         // localStorage.setItem('token', response.token);  // Stocker le token
          localStorage.setItem('userRole', 'admin');
          this.router.navigate(['/product']);  // Rediriger après connexion
          alert('Login succées');
        },
        (error) => {
          console.error('Login failed', error);
          alert('Login échoué. Veuillez vérifier vos informations.');
        }
      );
  }
 
}
