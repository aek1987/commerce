// services/order.service.ts
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Order } from '../modeles/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  // Observable des commandes
  orders$ = this.ordersSubject.asObservable();

  constructor() { }

  // Ajouter une nouvelle commande
  placeOrder(order: Order) {
    order.id = this.orders.length + 1;
    this.orders.push(order);
    this.ordersSubject.next(this.orders); // Mise à jour des commandes
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
