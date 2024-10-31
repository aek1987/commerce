// components/order-tracking/order-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { Order } from '../modeles/order.model';
import { OrderService } from '../service/order.service';
import { Commande } from '../modeles/commande';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null; 
  userId = -1;
  phone ="0";

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
            (orders: Order[]) => {
              if (Array.isArray(orders)) {
                this.orders = orders; 
                console.log('Commandes récupérées :', this.orders);
                console.log('Nombre de commandes trouvées :', this.orders.length);
              } else {
                console.error('La réponse n\'est pas un tableau.', orders);
              }
            },
            error => {
              console.error('Erreur lors de la récupération des commandes :', error);

            }
          );
          
        },
        error => {
          console.error('Erreur lors de la récupération de l\'ID client par téléphone :', this.phone, error);
          this.userId = -1;this.phone = "";
          // Optionnel : Afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.log('Aucun numéro de téléphone trouvé dans le localStorage.');
      // Optionnel : Afficher un message à l'utilisateur si le téléphone est manquant
    }
   
  }
  
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }
  


  showOrderDetails(orderId: number) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.showDetails = !order.showDetails; // Toggle pour afficher/masquer les détails
    }
  }

  closeDetails() {
    this.selectedCommande = null; // Logique pour fermer les détails
  }
}
