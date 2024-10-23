import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { faShoppingCart, faReceipt ,faUser, faGlobe } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAuthenticated: boolean = false;
  faShoppingCart = faShoppingCart;  
  faReceipt = faReceipt;
  faUser = faUser;
  faGlobe = faGlobe;
  CountItem :number=0;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router,private translate: TranslateService) {

  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

     // Subscribe to the totalItem$ observable
     this.cartService.totalItem$.subscribe(count => {
      this.CountItem = count; // Update CountItem with the latest value
    });
  

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
