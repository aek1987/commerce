import { Component } from '@angular/core';
import { CartService } from '../cart.service';  // Importer le service du panier

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits (vous pouvez en ajouter plus)
  products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Smartphone', price: 700 },
    { name: 'Headphones', price: 150 }
  ];

  constructor(private cartService: CartService) {}

  // Méthode pour ajouter un produit au panier
  addToCart(product: any) {
    this.cartService.addProduct(product);
  }
}
