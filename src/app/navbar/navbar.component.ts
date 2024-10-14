import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { faShoppingCart, faReceipt ,faUser, faGlobe } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  faShoppingCart = faShoppingCart;  
  faReceipt = faReceipt;
  faUser = faUser;
  faGlobe = faGlobe;
  
  constructor(private authService: AuthService, private router: Router,private translate: TranslateService) {}

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
 
  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
