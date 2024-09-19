import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model'; // Importer l'interface Product

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[] = []; // Déclaration avec l'interface Product
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.calculateTotal();
  }
}
