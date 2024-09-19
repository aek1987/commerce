import { Component } from '@angular/core';
import { CartService } from '../cart.service';  // Importer le service du panier

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items = this.cartService.getItems();  // Récupérer les produits du panier

  constructor(private cartService: CartService) {}

  // Méthode pour vider le panier
  clearCart() {
    this.items = this.cartService.clearCart();
  }
}
