import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { faShoppingCart, faReceipt ,faUser } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  faShoppingCart = faShoppingCart;  
  faReceipt = faReceipt;faUser = faUser;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  goToLogin() {
    this.router.navigate(['']);  // Redirige vers le formulaire de connexion
  }

  goToManager() {
   
   
   
   
   
   
    this.router.navigate(['/manager']);  // Redirige vers le formulaire de connexion
  }
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/register']);  // Redirige après déconnexion
  }
}
