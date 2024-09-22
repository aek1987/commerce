import { Injectable } from '@angular/core';
import { Product } from './product.model'; // Importer l'interface Product

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = []; // Utilisation de l'interface Product
  total:number=0;
  constructor() { }

  addProduct(product: Product) {
    this.items.push(product);
    this.getTotal();
    console.log('Produit ajouté au panier:', product);
  }

  getItems(): Product[] {
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    return this.items;
  }

  getTotal(): number {
   
    this.total = this.items.reduce((total, item) => total + item.price, 0);
    console.log(`Total price of items in the cart: ${this.total} €`);
    return this.total;
  }
}
