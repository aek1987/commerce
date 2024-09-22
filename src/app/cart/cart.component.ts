import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model'; // Importer l'interface Product

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit ,OnChanges{
  items: Product[] = []; // Déclaration avec l'interface Product
  total0: number = 10;
  total: number = 10;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.calculateTotal();
  }
  ngOnChanges() {
    this.total = this.cartService.getTotal();
  }
  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
    this.calculateTotal();
  }
}
