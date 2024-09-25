import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../modeles/product.model'; // Importer l'interface Product

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = []; // Utilisation de l'interface Product// Liste des produits dans le panier
  total:number=0;


  private itemsSubject = new BehaviorSubject<Product[]>(this.items); // Utilisation de BehaviorSubject
  private totalSubject = new BehaviorSubject<number>(0); // Pour suivre le total

  // Observable pour les items
  items$ = this.itemsSubject.asObservable();
  // Observable pour le total
  total$ = this.totalSubject.asObservable();
  constructor() {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }
// Ajoute un produit au panier
  addProduct(product: Product) {
    
    this.items.push(product);
   
    this.itemsSubject.next(this.items); // Mise à jour de l'observable
    this.updateTotal(); // Met à jour le total après l'ajout
   
    this.getTotal();
    console.log('Produit ajouté au panier:', product);
    this.saveCart();
  }

  getItems(): Product[] {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
    return this.items;
  }

  clearCart(): Product[] {
    this.items = []; 
    this.saveCart(); 
    return this.items;
  }
  updateTotal() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    this.totalSubject.next(total); // Mise à jour du total observable
  }


  getTotal(): number {
   
    this.total = this.items.reduce((total, item) => total + item.price, 0);
    console.log(`Total price of items in the cart: ${this.total} €`);
    return this.total;
  }

// Sauvegarder le panier dans le Local Storage
saveCart() {
  localStorage.setItem('cart', JSON.stringify(this.items));
}


}
