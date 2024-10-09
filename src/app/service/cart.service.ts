import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../modeles/product.model'; // Importer l'interface Product
import { Panier } from '../modeles/Panier.model'; // Importer l'interface Product
@Injectable({
  providedIn: 'root'
})


export class CartService {
  private items: Panier[] = []; // Utilisation de l'interface Product// Liste des produits dans le panier
  total:number=0;


  private itemsSubject = new BehaviorSubject<Panier[]>(this.items); // Utilisation de BehaviorSubject
  private totalSubject = new BehaviorSubject<number>(0); // Pour suivre le total

  // Observable pour les items
  items$ = this.itemsSubject.asObservable();
  // Observable pour le total
  total$ = this.totalSubject.asObservable();
  constructor() {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('panier');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }
// Ajoute un produit au panier
  addProduct(product: Product) {
     

    const existingProduct = this.items.find(item => item.product.id === product.id);
    if (existingProduct) {
      // Augmentez la quantité si le produit existe déjà
      existingProduct.quantity++;
    } else {
      // Ajoutez le produit avec une quantité de 1
      this.items.push({ product, quantity: 1 });
    }
    this.itemsSubject.next(this.items); // Mise à jour de l'observable
    this.updateTotal(); // Met à jour le total après l'ajout
    this.saveCart();
  }

  getItems(): Panier[] {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('panier');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.itemsSubject.next(this.items); // Émet les items du panier
      this.updateTotal(); // Met à jour le total après la récupération
    }
    return this.items;
  }

  clearCart(): Panier[] {
    this.items = []; 
    this.saveCart(); 
    this.totalSubject.next(0); // Réinitialise le total
    return this.items;
  }
  updateTotal() {
    const total = this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.totalSubject.next(total); // Mise à jour du total observable
  }


  getTotal(): number {
   
    this.total = this.items.reduce((total, item) => total + item.product.price, 0);
    console.log(`Total price of items in the cart: ${this.total} €`);
    return this.total;
  }

// Sauvegarder le panier dans le Local Storage
saveCart() {
  localStorage.setItem('panier', JSON.stringify(this.items));
}


}
