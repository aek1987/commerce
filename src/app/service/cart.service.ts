import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../modeles/product.model'; // Importer l'interface Product
import { Panier } from '../modeles/Panier.model'; // Importer l'interface Product
@Injectable({
  providedIn: 'root'
})


export class CartService {
  private panier: Panier[] = []; // Utilisation de l'interface Product// Liste des produits dans le panier
  total:number=0;
   
  


  private itemsSubject = new BehaviorSubject<Panier[]>(this.panier); // Utilisation de BehaviorSubject
  private totalSubject = new BehaviorSubject<number>(0); // Pour suivre le total
  private totalItemSubject = new BehaviorSubject<number>(0);


  // Observable pour les items
  items$ = this.itemsSubject.asObservable();
  // Observable pour le total
  total$ = this.totalSubject.asObservable();

  totalItem$ = this.totalItemSubject.asObservable();
  constructor() {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('panier');
    if (savedCart) {
      this.panier = JSON.parse(savedCart);
    }
  }
// Ajoute un produit au panier
  addProduct(product: Product) {
     
    const existingProduct = this.panier.find(panier => panier.product.id === product.id);
    if (existingProduct) {
      // Augmentez la quantité si le produit existe déjà
      existingProduct.quantity++;
    } else {
      // Ajoutez le produit avec une quantité de 1
      this.panier.push({ product, quantity: 1 });
    }
    this.itemsSubject.next(this.panier); // Mise à jour de l'observable
    this.updateTotal(); // Met à jour le total après l'ajout
    this.totalItemSubject.next(this.panier.length)
    this.saveCart();
    
  ; // Met
  }

  getItems(): Panier[] {
    // Récupérer le panier à partir du Local Storage lors de l'initialisation
    const savedCart = localStorage.getItem('panier');
    if (savedCart) {
      this.panier = JSON.parse(savedCart);
      this.itemsSubject.next(this.panier); // Émet les items du panier
      this.updateTotal(); // Met à jour le total après la récupération
    }
    console.log(`panier: ${ JSON.stringify(this.panier)} `);
    return this.panier;
  }

  clearCart(): Panier[] {
    this.panier = []; 
    
    this.totalSubject.next(0); // Réinitialise le total
    this.saveCart(); 
    return this.panier;
  }
  updateTotal() {
    const total = this.panier.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.totalSubject.next(total); // Mise à jour du total observable

     // Mettre à jour le nombre total d'articles dans le panier
     const totalItems = this.panier.reduce((count, item) => count + item.quantity, 0);
     this.totalItemSubject.next(totalItems);
  }


  getTotal(): number {
   
    this.total = this.panier.reduce((total, item) => total + item.product.price, 0);
    console.log(`Total price of items in the cart: ${this.total} €`);
    return this.total;
  }

// Sauvegarder le panier dans le Local Storage
saveCart() {
 
   localStorage.setItem('panier', JSON.stringify(this.panier));
  console.log(`panier: ${ JSON.stringify(this.panier)} `);
}


}
