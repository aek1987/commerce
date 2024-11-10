
import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { OrderDatabase } from '../modeles/order.model';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsService } from '../service/products.service';

interface Produit {
  productid: string;
  quantity: number; 
  name: string;
  prix: number; 
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
  
  OrdersALL: OrderDatabase[] = [];
 
  ItemsOrders:Produit[]| null = null;
     
  constructor(private orderService: OrderService, private productsService :ProductsService) 
  {}
    
  ngOnInit(): void {
    this.orderService.getALLOrders().subscribe(
      (orders: any[]) => {
         // Ajoutez isDetailsVisible à chaque commande
      this.OrdersALL = orders
        this.OrdersALL.forEach(order => {this.loadCustomerName(order)}); // Charger le nom pour chaque commande
      },
      error => console.error('Erreur lors de la récupération des commandes', error)
    );
  }

  loadCustomerName(order: any) {
    order.isDetailsVisible=false;
    this.orderService.getInfoCustomer(order.customerid).subscribe(
      (response) => {
       order.customerName = response.name; 
       order.customerTel = response.phone; 
              console.log('informations du client', order.customerName)
      },
      error => console.error('Erreur lors de la récupération des informations du client', error)
    );
  }
  loadProductsOrderItems(order: any): void {
    
        
  
    this.orderService.loadProductsOrderItems(order.id).subscribe(
      (response: Produit[]) => {
        if (!response || response.length === 0) {
          console.warn('Aucun produit trouvé pour la commande numéro', order.id);
          return;
        }
  
        this.ItemsOrders = response;
  
        // Charger les détails de chaque produit
        this.ItemsOrders.forEach(item => {
          
          this.loadProductDetails(item);console.log('produit id a recherche'+ item.productid);
        });
  
        console.log('Liste des produits pour la commande numéro', order.id, this.ItemsOrders);
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits de la commande', error);
      }
    );
  }
  
  
  loadProductDetails(produit: Produit) {

    this.productsService.getProductpropertise(produit.productid).subscribe(
      
      (response) => {
        produit.name=response.name;
        produit.prix=response.price;
        console.log('produit info',  produit.name," nom de produit",produit.prix=response.price)
       
      },
      error => console.error('Erreur lors de la récupération des détails du produit', error)
    );
  }
  
  // Fonction pour afficher les détails d'une commande
  viewDetails(commande: OrderDatabase) {
    console.log("Selected commande après clic:", this.selectedCommande?.orderdate);
    if (this.selectedCommande && this.selectedCommande.id === commande.id) {
           this.closeDetails(); // Ferme les détails si la même commande est cliquée
  } else {
      this.selectedCommande = commande; // Assignez ici la commande correctement
      this.selectedCommande.isDetailsVisible = true;
     
      this.loadProductsOrderItems(this.selectedCommande);
  }
    
  }

  // Fonction pour fermer les détails de la commande
  closeDetails() {
    if (this.selectedCommande) {
      this.selectedCommande.isDetailsVisible = false;
    }
    this.selectedCommande = null;
  
  }

  // Fonction pour modifier une commande (à implémenter selon ton besoin)
  editCommande(commande: OrderDatabase) {
    // Annuler la commande
  this.orderService.changeState(commande.id).subscribe(
    (response) => {
      
    
  })
}

 // Fonction pour annuler une commande
SupprimerCommande(commande: OrderDatabase) {
  // Annuler la commande
  this.orderService.cancelOrder(commande.id).subscribe(
    (response) => {
      // Si l'annulation est réussie, mettre à jour le statut
      commande.status = 'Annulé';
      
      // Suppression des articles après l'annulation réussie
      this.orderService.deleteItems(commande.id).subscribe(
        (response) => {
          // Traitement après la suppression des articles si nécessaire
        },
        error => console.error('Erreur de suppression des articles de la commande, error', error)
      );
    },
    error => console.error('Erreur de suppression de la commande, error', error)
  );
}
}
