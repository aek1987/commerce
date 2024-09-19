import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  // Ajouter un produit au panier
  addProduct(product: any) {
    this.items.push(product);
  }

  // Récupérer les produits dans le panier
  getItems() {
    return this.items;
  }

  // Vider le panier
  clearCart() {
    this.items = [];
    return this.items;
  }
}
