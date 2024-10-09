import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../modeles/product.model'; // Importer l'interface Product
import { Router } from '@angular/router'; // Importer Router
import { ToastrService } from 'ngx-toastr';
import { Panier } from '../modeles/Panier.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items:Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
   
 
  constructor(private cartService: CartService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
     // S'abonner aux changements des items
     this.cartService.items$.subscribe(items => {
     this.items = items;
    });

    // S'abonner aux changements du total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
  }
  
  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
   this.items = this.cartService.clearCart();
    this.calculateTotal();
  }

  // Rediriger vers la page de confirmation de commande
  goToConfirmationPage() {
    this.router.navigate(['/confirm-order']);

    this.router.navigate(['/confirm-order']).then(success => {
      if (success) {
        console.log('Redirection réussie');
      } else {
        console.log('Redirection échouée');
      }
    });
  }

  // Méthode pour retirer un produit du panier
removeFromCart(itemToRemove: any) {
  // Chercher l'index de l'élément à retirer
  const index = this.items.findIndex(item => item.product.id === itemToRemove.product.id);

  // Si l'élément est trouvé, le retirer du tableau
  if (index > -1) {
    this.items.splice(index, 1);  // Retirer 1 élément à la position trouvée
    this.calculateTotal();  // Recalculer le total après suppression
  }

  // Afficher un message de succès
  this.toastr.info('Produit retiré du panier', '', {
    positionClass: 'toast-bottom-right',
    timeOut: 2000
  });
}
}
