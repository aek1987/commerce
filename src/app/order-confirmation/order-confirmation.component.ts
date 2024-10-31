// components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { AlertService } from '../service/alerte-service.service';
import { Panier } from '../modeles/Panier.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  items:Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
// Ajoutez cette propriété à votre composant
     alertMessage: string | null = null;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router ,  
    public alertService: AlertService) { }  // Injecter le service d'alerte) { }

  ngOnInit(): void {
     // S'abonner aux changements des items
     this.cartService.items$.subscribe(items => {
      this.items = items;
     });
 
     // S'abonner aux changements du total
     this.cartService.total$.subscribe(total => {
       this.total = total;
     
     });
     
     
  }
  loadCart() {
    const storedCart = localStorage.getItem('panier');
    
    try {
      this.items = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Erreur lors de l\'analyse du panier', error);
      this.items = [];
    }
  
    console.log('panier:', this.items);
  }
  
  calculateTotal() {
   // this.total = this.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }
  confirmOrder() {
 
// Vérifier si le panier est vide
if (this.items.length === 0) {
  Swal.fire({
    icon: 'warning',
    title: 'Alerte',
    text: 'Pour procéder à la commande, veuillez ajouter des produits à votre panier. Merci de votre compréhension.',
    showCancelButton: true,
    confirmButtonText: 'Ajouter des produits',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/product']); // Redirige vers la page des produits
    }
  });
  return; // Arrêter l'exécution si le panier est vide
}

const order = {
    id: 0,
    userId: 1, // ID utilisateur (obtenu dynamiquement dans un vrai contexte)
 //   products: this.items.map(item => ({ productId: item.product.id, quantity: item.quantity })), // Utiliser la quantité réelle
 products: [], // Utiliser la quantité réelle
    totalPrice: this.total,
    status: 'En cours',
    orderDate: new Date(),
    customerName: "nekaa",
    customerEmail: "aek",
    address: "alger"
  };
 
  //this.orderService.placeOrder(order); // Envoyer la commande
  // Vider le panier après commande
  this.router.navigate(['/delivery']); // Rediriger vers la page de suivi des commandes



  
}

  cancelOrder() {
    this.cartService.clearCart(); 
    this.router.navigate(['/product']); // Rediriger vers le panier si annulation
  }
}
