// components/order-confirmation/order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  items = this.cartService.getItems();
  total = this.cartService.getTotal();

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    
      console.log('Page de confirmation chargée');
    
  
  }

  confirmOrder() {
    const order = {
      id:0,
      userId: 1, // ID utilisateur (obtenu dynamiquement dans un vrai contexte)
      products: this.items.map(item => ({ productId: item.id, quantity: 1 })),
      totalPrice: this.total,
      status: 'En cours',
      orderDate: new Date(),
      customerName: "nekaa",
      customerEmail: "aek",
      address: "alger"
    };
    this.orderService.placeOrder(order);
    this.cartService.clearCart(); // Vider le panier après commande
    this.router.navigate(['/delivery']); // Rediriger vers la page de suivi des commandes
  }

  cancelOrder() {
    this.router.navigate(['/cart']); // Rediriger vers le panier si annulation
  }
}
