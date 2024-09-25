import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../modeles/product.model'; // Importer l'interface Product
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems(); // Obtenir les produits du panier
  total = this.cartService.getTotal(); // Calculer le total
   
 
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
     // S'abonner aux changements des items
     this.cartService.items$.subscribe(items => {
      this.items = items;
    });

    // S'abonner aux changements du total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
  }
  
  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.calculateTotal();
  }

  // Rediriger vers la page de confirmation de commande
  goToConfirmationPage() {
    this.router.navigate(['/confirm-order']);

    this.router.navigate(['/confirm-order']).then(success => {
      if (success) {
        console.log('Redirection réussie');
      } else {
        console.log('Redirection échouée');
      }
    });
  }
}
