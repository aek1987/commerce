
import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { OrderDatabase } from '../modeles/order.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsService } from '../service/products.service';

interface Produit {
  id: string;
  quantity: number; 
  name: string;
  prix: number; 
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
  ItemsOrders:Produit[]| null = null;
     
  constructor(private orderService: OrderService, private productsService :ProductsService) 
  {}
    
  ngOnInit(): void {
    this.orderService.getALLOrders().subscribe(
      (orders: any[]) => {
         // Ajoutez isDetailsVisible à chaque commande
      this.OrdersALL = orders.map(order => ({
        ...order,
        isDetailsVisible: false // Initialiser à false pour masquer les détails
      }));
        this.OrdersALL.forEach(order => this.loadCustomerName(order)); // Charger le nom pour chaque commande
      },
      error => console.error('Erreur lors de la récupération des commandes', error)
    );
  }

  loadCustomerName(order: any) {
    this.orderService.getInfoCustomer(order.customerId).subscribe(
      (response) => {
       order.customerName = response.name; 
       order.customerTel = response.phone; 
      
       console.log('informations du client', order.customerName)
      },
      error => console.error('Erreur lors de la récupération des informations du client', error)
    );
  }
  loadProductsOrderItems(order: any): void {
    order.isDetailsVisible = !order.isDetailsVisible; // Bascule l'affichage des détails
    this.orderService.loadProductsOrderItems(order.id).subscribe(
      (response: Produit[]) => {
        this.ItemsOrders = response;
  
        // Charger les détails de chaque produit
        this.ItemsOrders.forEach(item => {
          this.loadProductDetails(item);
        });
  
        console.log('Liste des produits pour la commande numéro', order.id, this.ItemsOrders);
      },
      (error) => console.error('Erreur lors de la récupération des produits de la commande', error)
    );
  }
  
  loadProductDetails(produit: Produit) {
    this.productsService.getProductpropertise(produit.id).subscribe(
      (response) => {
        produit.name=response.name;
        produit.prix=response.price;
        console.log('produit info',  produit.name," prid de produit",produit.prix=response.price)
       
      },
      error => console.error('Erreur lors de la récupération des détails du produit', error)
    );
  }
  
  // Fonction pour afficher les détails d'une commande
  viewDetails(commande: OrderDatabase) {
    this.selectedCommande = commande;
    this.loadProductsOrderItems(this.selectedCommande);
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
   
    this.orderService.cancelOrder(commande.id).subscribe(
      (response) => {
             
      },
      error => console.error('Erreur de supprission de id de commande, error')
    );
      commande.status = 'Annulé';
    }
  
}
