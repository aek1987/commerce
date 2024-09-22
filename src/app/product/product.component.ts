import { Component } from '@angular/core';
import { CartService } from '../cart.service';  // Importer le service du panier
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits avec nom, prix et description
  products = [
    { name: 'Laptop', price: 1000, description: 'Un ordinateur portable puissant avec 16 Go de RAM et 512 Go de SSD.', image: 'assets/laptop.jpg' },
    { name: 'Smartphone', price: 700, description: 'Un smartphone moderne avec un écran AMOLED et une caméra 48MP.', image: 'assets/laptop.jpg' },
    { name: 'Headphones', price: 150, description: 'Des écouteurs sans fil avec réduction de bruit active.', image: 'assets/laptop.jpg' }
  ];
  

  constructor(private cartService: CartService) {}

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product) {
    console.log('Produit clique:', product);
    
    this.cartService.addProduct(product);
    
    
  }
}
