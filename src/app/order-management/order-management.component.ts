
import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { OrderDatabase } from '../modeles/order.model';
import { trigger, style, animate, transition } from '@angular/animations';

interface Produit {
  name: string;
  quantity: number;
  price: number;
}

interface Commande {
  id: number;
  clientName: string;
  date: Date;
  total: number;
  status: string;
  address: string;
  produits: Produit[];
}

@Component({
  selector: 'app-commande',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
  animations: [
    trigger('detailsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class OrderManagementComponent {
  selectedCommande: OrderDatabase|null = null;
  selectedCommandeIndex: number | null = null;
  OrdersALL: OrderDatabase[] = [];
  
  selectedClient: Commande | null = null;
     
  constructor(private orderService: OrderService) {}
    
  ngOnInit(): void {
    this.orderService.getALLOrders().subscribe(
      (orders: any[]) => {
        this.OrdersALL = orders;
        this.OrdersALL.forEach(order => this.loadCustomerName(order)); // Charger le nom pour chaque commande
      },
      error => console.error('Erreur lors de la récupération des commandes', error)
    );
  }

  loadCustomerName(order: any) {
    this.orderService.getInfoCustomer(order.customerId).subscribe(
      (response) => {
       order.customerName = response.name; // Remplace customerId par customerName
       console.log('informations du client', order.customerName)
      },
      error => console.error('Erreur lors de la récupération des informations du client', error)
    );
  }


  // Fonction pour afficher les détails d'une commande
  viewDetails(commande: OrderDatabase) {
    this.selectedCommande = commande;
   // this.selectedCommandeIndex = index;
  }

  // Fonction pour fermer les détails de la commande
  closeDetails() {
    this.selectedCommande = null;
    this.selectedCommandeIndex = null;
  }

  // Fonction pour modifier une commande (à implémenter selon ton besoin)
  editCommande(commande: OrderDatabase) {
   // alert(`Modifier la commande #${commande.id} de ${commande.clientName}`);
    // Implémenter la logique de modification ici
  }

  // Fonction pour annuler une commande (à implémenter selon ton besoin)
  cancelCommande(commande: OrderDatabase) {
    if (confirm(`Êtes-vous sûr de vouloir annuler la commande #${commande.id} ?`)) {
      commande.status = 'Annulé';
    }
  }
}
