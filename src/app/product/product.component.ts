import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';  // Importer le service du panier
import { Product } from '../modeles/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits avec nom, prix et description
  products = [
    { id: 1,name: 'Laptop', price: 1000, description: 'Un ordinateur portable puissant avec 16 Go de RAM et 512 Go de SSD.', image: 'assets/laptop.jpg' },
    { id: 1, name: 'Smartphone', price: 700, description: 'Un smartphone moderne avec un écran AMOLED et une caméra 48MP.', image: 'assets/laptop.jpg' },
    {id: 1, name: 'Headphones', price: 150, description: 'Des écouteurs sans fil avec réduction de bruit active.', image: 'assets/laptop.jpg' }
  ];
  filteredProducts: Product[] = [];searchQuery: string = '';
  ngOnInit() {
    this.filteredProducts = this.products; // Initially, show all products
  }
  // Tableau des produits dans le panier
  cart: Product[] = [];
  constructor(private cartService: CartService) {}

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product) {
    console.log('Produit clique:', product);
    
    this.cartService.addProduct(product);
    
    
  }
   // Méthode pour calculer le total du panier
   calculateTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  searchProducts() {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // If search query is empty, show all products
    }
  }


}
