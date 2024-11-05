import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { faShoppingCart, faReceipt ,faUser, faGlobe, faSearch, faMapMarkerAlt, faMap, faPhone } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
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

  faSearch = faSearch;  // Icône de recherche
  isSearchVisible: boolean = false;  // Variable pour afficher ou masquer l'input
  searchQuery: string = '';  // Contient la recherche en cours
  faMapMarkerAlt = faMapMarkerAlt;
  faMap = faMap;
  faPhone = faPhone;
  constructor(private cartService: CartService, private authService: AuthService, private router: Router,private translate: TranslateService) {

  }

  // Fonction pour afficher ou masquer la barre de recherche
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }
  // Logique de recherche
  onSearch() {
    console.log('Recherche en cours :', this.searchQuery);
    // Ajoutez ici la logique pour filtrer les produits
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
   
      
   
   
    this.router.navigate(['/ordersAllClient']);  // Redirige vers le formulaire de connexion
  }
  goToStock() {  
   
      
   
   
    this.router.navigate(['/stock']);  // Redirige vers le formulaire de connexion
  }
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/register']);  // Redirige après déconnexion
  }
 
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
