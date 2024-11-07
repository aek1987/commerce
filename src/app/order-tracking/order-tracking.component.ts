// components/order-tracking/order-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderDatabase } from '../modeles/order.model';
import { OrderService } from '../service/order.service';
import { Commande } from '../modeles/commande';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProductsService } from '../service/products.service';


interface Produit {
  productid: string;
  quantity: number; 
  name: string;
  prix: number; 
}

interface Client {
  name: string;
  tel: number; 
  address: string;
}
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
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
export class OrderTrackingComponent implements OnInit {
  orders: OrderDatabase[] = [];
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null; 
  client: Client = { name: '', tel: 0, address: '' };
  userId = -1;
  phone ="0";
  ItemsOrders:Produit[]| null = null;
  constructor(private orderService: OrderService,private productsService :ProductsService) { }
  ngOnInit(): void {
    
    this.phone = localStorage.getItem('clientPhone') || '';
    console.log('Numéro de téléphone récupéré :', this.phone);  
    if (this.phone) {
      this.getClientIdOrders(this.phone);
    } else {
      console.log('Aucun numéro de téléphone trouvé dans le localStorage.');    
      }
  }
  
  private getClientIdOrders(phone: string): void {
    this.orderService.getClientIDByPhone(phone).subscribe(
      response => {
        this.userId = response.id;
        this.client.name=response.name;
        this.client.tel=response.phone;
        this.client.address=response.address;
        
        
        console.log('ID client récupéré :', this.userId);    
        
        // Récupérer les commandes de l'utilisateur
        this.orderService.getUserOrdersById(this.userId).subscribe(
          (orders: OrderDatabase[]) => {
            
            if (Array.isArray(orders)) {
              this.orders = orders;
              
              console.log('Commandes récupérées :', this.orders);
              console.log('Nombre de commandes trouvées :', this.orders.length);
             
            
            } else {
              console.error('La réponse des commandes n\'est pas un tableau :', orders);
              // Optionnel : Afficher un message d'erreur à l'utilisateur concernant le format de la réponse
            }
          },    
        );
             
        
             
        
        
        
        
        
        
      },
      error => {
        console.error(`Erreur lors de la récupération de l'ID client pour le numéro ${phone} :`, error);
        this.userId = -1;
        this.phone = "";
       
      }
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
       
        this.ItemsOrders.forEach(item => {
          
          this.loadProductDetails(item);
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
  cancelOrder(order: any) {
    this.orderService.cancelOrder(order);
  }
  


  showOrderDetails(order: any) {
  
    if (order) {
      order.isDetailsVisible = !order.isDetailsVisible; // Basculer l'affichage des détails 
     this.loadProductsOrderItems(order)
    }
  }

  closeDetails() {
    this.selectedCommande = null; // Logique pour fermer les détails
  }
}
