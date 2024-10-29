// components/order-tracking/order-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { Order } from '../modeles/order.model';
import { OrderService } from '../service/order.service';
import { Commande } from '../modeles/commande';


@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null; 

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = 1; // Id utilisateur (à obtenir dynamiquement)
    this.orderService.getUserOrder().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      }
    );
  }

  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }
  showOrderDetails(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }

   // Fonction pour afficher les détails d'une commande
   viewDetails(commande: Commande) {
    this.selectedCommande = commande;
  }
  
  // Fonction pour fermer les détails de la commande
  closeDetails() {
    this.selectedCommande = null;
  }
}
