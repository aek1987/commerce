// services/order.service.ts
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../modeles/order.model';
import { Commande } from '../modeles/commande';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modeles/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  // Observable des commandes
  orders$ = this.ordersSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/orders';  // remote json-server URL
  constructor(private http: HttpClient) {}

  // Fetch products from the API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Ajouter un produit
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
   // Supprimer un produit par ID
   deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


  // Ajouter une nouvelle commande
  PasserCommande(commande: Commande) : Observable<Commande>{
    
    return this.http.post<Commande>(this.apiUrl, commande);

  }

  // Obtenir toutes les commandes d'un utilisateur
  getUserOrders(userId: number): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  // Annuler une commande
  cancelOrder(orderId: number) {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1 && this.orders[orderIndex].status === 'En cours') {
      this.orders[orderIndex].status = 'Annulée';
      this.ordersSubject.next(this.orders); // Mise à jour des commandes
    }
  }
}
