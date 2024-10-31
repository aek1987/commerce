import { Component, OnChanges, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router'; // Importer Router
import { ToastrService } from 'ngx-toastr';
import { Panier } from '../modeles/Panier.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items:Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
 
   
  constructor(private cartService: CartService, private router: Router,private toastr: ToastrService) { }
  ngOnInit(): void {
    // S'abonner aux changements des items
    this.cartService.items$.subscribe(items => {
      this.items = items;
      console.log('Panier mis à jour:', this.items);
    });
  
    // S'abonner aux changements du total
    this.cartService.total$.subscribe(total => {
      this.total = total;
      console.log('Total du panier mis à jour:', this.total);
    });
  
    // Charger les items du panier initialement
    this.items = this.cartService.getPanierItems();
    console.log('Panier initial après chargement catre composant:', this.items);
  }
  
  
  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
   this.cartService.clearCart();   
   this.router.navigate(['/product']);
  }

  // Rediriger vers la page de confirmation de commande
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
     
    //  this.orderService.placeOrder(order); // Envoyer la commande
      // Vider le panier après commande
      this.router.navigate(['/delivery']); // Rediriger vers la page de suivi des commandes
    
    
    
      
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
