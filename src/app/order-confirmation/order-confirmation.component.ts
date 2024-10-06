// components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { AlertService } from '../service/alerte-service.service';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  items = this.cartService.getItems();
  total = this.cartService.getTotal();
// Ajoutez cette propriété à votre composant
alertMessage: string | null = null;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router ,  
    private alertService: AlertService) { }  // Injecter le service d'alerte) { }

  ngOnInit(): void {
    
      console.log('Page de confirmation chargée');
    
  
  }

  confirmOrder() {
 // Vérifier si le panier est vide
 if (this.items.length === 0) {
  this.alertService.warning('Votre panier est vide. Ajoutez des produits avant de passer commande.', 'Alerte');
  return; // Arrêter l'exécution si le panier est vide
}

  const order = {
    id: 0,
    userId: 1, // ID utilisateur (obtenu dynamiquement dans un vrai contexte)
    products: this.items.map(item => ({ productId: item.product.id, quantity: item.quantity })), // Utiliser la quantité réelle
    totalPrice: this.total,
    status: 'En cours',
    orderDate: new Date(),
    customerName: "nekaa",
    customerEmail: "aek",
    address: "alger"
  };

  this.orderService.placeOrder(order); // Envoyer la commande
  this.cartService.clearCart(); // Vider le panier après commande
  this.router.navigate(['/delivery']); // Rediriger vers la page de suivi des commandes
}

  cancelOrder() {
    this.router.navigate(['/product']); // Rediriger vers le panier si annulation
  }
}
