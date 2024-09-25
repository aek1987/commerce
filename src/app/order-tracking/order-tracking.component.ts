// components/order-tracking/order-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { Order } from '../modeles/order.model';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userId = 1; // Id utilisateur (à obtenir dynamiquement)
    this.orders = this.orderService.getUserOrders(userId);
  }

  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId);
  }
}
