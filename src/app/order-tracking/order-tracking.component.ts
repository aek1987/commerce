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
  userId = -1;
  phone ="";
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    // Récupérer le numéro de téléphone du localStorage
    this.phone = localStorage.getItem('clientPhone') || '';
    const name = localStorage.getItem('clientName') || '';
    const wilaya = localStorage.getItem('clientWilaya') || '';
  
    console.log('Numéro de téléphone du client :', this.phone);
  
    if (this.phone) {
      this.orderService.getClientIDByPhone(this.phone).subscribe(
        response => {
          this.userId = response.id;
          console.log('ID client récupéré :', this.userId);
  
          // Récupérer les commandes une fois que userId est disponible
          this.orderService.getUserOrdersById(this.userId).subscribe(
            (orders: Order) => {
              this.orders = [orders]; 
           /*   if (Array.isArray(orders)) {
                this.orders = orders;
              
               
              } else {
                console.error('La réponse n\'est pas un tableau.', orders);
              }*/
            },
          );
        },
        error => {
          console.error('Erreur lors de la récupération de l\'ID client par téléphone :', this.phone, error);
          this.userId = -1;
          // Optionnel : Afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.error('Aucun numéro de téléphone trouvé dans le localStorage.');
      // Optionnel : Afficher un message à l'utilisateur si le téléphone est manquant
    }
    console.log('Commandes récupérées :', this.orders);
    console.log('Nombre de commandes trouvées :', this.orders.length);
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
