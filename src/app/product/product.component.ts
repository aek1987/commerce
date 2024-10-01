import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';  // Importer le service du panier
import { Product } from '../modeles/product.model';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Liste des produits avec nom, prix et description
  products = [
    { id: 1,name: 'Laptop', price: 1000, description: 'Un ordinateur portable puissant avec 16 Go de RAM et 512 Go de SSD.', image: 'assets/laptop.jpg', category: 'Phones' },
    { id: 2, name: 'Smartphone', price: 700, description: 'Un smartphone moderne avec un écran AMOLED et une caméra 48MP.', image: 'assets/laptop.jpg', category: 'Laptops' },
    {id: 3, name: 'Headphones', price: 150, description: 'Des écouteurs sans fil avec réduction de bruit active.', image: 'assets/laptop.jpg', category: 'Accessories' },
  
   {
      id: 4, name: 'iPhone 14', price: 999.00,   description: 'iPhone 14 avec écran de 6.1 pouces, 128 Go',    
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=iPhone+14', category: 'Phones'
    },
  ];
  filteredProducts: Product[] = [];
  searchQuery: string = '';  showAll: boolean = false;   

  categories: string[] = ['All', 'Phones', 'Laptops', 'Accessories']; // Liste des catégories
  selectedCategory: string = 'All'; // Catégorie sélectionnée

  faCartPlus = faCartPlus; // Déclarer l'icône dans la classe du composant
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
  // Méthode pour filtrer les produits en fonction de la catégorie
  filterByCategory(event: Event) {
  
    
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    if (selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === selectedCategory);
    }
  }

}
