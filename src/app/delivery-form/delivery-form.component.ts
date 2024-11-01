import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';
import { Wilaya } from '../modeles/Wilaya.model';
import { Panier } from '../modeles/Panier.model';
import { CartService } from '../service/cart.service';
import { Commande } from '../modeles/commande';
import { OrderService } from '../service/order.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent  implements OnInit{
  deliveryFee: number = 0; // Exemple de frais de livraison fixe
  items: Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
  total_a_payer :number=0; // Calculer le total
  wilayas: Wilaya[] = [
    { name: 'Alger', communes: ['Bab El Oued', 'Hussein Dey', 'El Harrach'] },
    { name: 'Oran', communes: ['Es-Sénia', 'Aïn El Türck', 'Gdyel'] },
    { name: 'Constantine', communes: ['El Khroub', 'Aïn Smara', 'Didouche Mourad'] },
    // Ajoutez d'autres wilayas et communes ici
  ];

  deliveryInfos = {
    address: '',
    wilaya: '',
    commune: '',
    name:"",
    phone:""
  

  };
  cardDetails = {
    number: '',
    expiry: '',
    cvv: ''
  };
  
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
    console.log('Panier initial après chargement:', this.items);
  }
  

  
  selectedCommunes: string[] = [];
  paymentMode: string = 'cash'; // Par défaut, paiement par carte
  constructor(private paymentService: PaymentService,private router: Router,private cartService: CartService ,private orderservice:OrderService ) {}
  onWilayaChange(event: Event) {
 // Lorsque la wilaya est changée
const selectedWilaya = (event.target as HTMLSelectElement).value;
this.deliveryInfos.wilaya = selectedWilaya;
// Trouver les communes de la wilaya sélectionnée
const wilaya = this.wilayas.find(w => w.name === selectedWilaya);
this.selectedCommunes = wilaya ? wilaya.communes : [];
this.deliveryInfos.commune = ''; // Réinitialiser la commune

// Ajouter les frais de livraison en fonction de la wilaya sélectionnée
if (selectedWilaya === 'Alger') {
  this.deliveryFee = 300; // Frais de livraison pour Alger
} else {
  this.deliveryFee = 500; // Pas de frais ou définir des frais pour d'autres wilayas
}

// S'abonner aux articles du panier
this.cartService.items$.subscribe(items => {
  this.items = items;
});




  }

  onCommuneChange(event: Event) {
    this.deliveryInfos.commune = (event.target as HTMLSelectElement).value;
  }
 

  onSubmit() {
    // Soumettre les informations de livraison
    console.log('Informations de livraison:', this.deliveryInfos);
  }

  
  
   setPaymentMode(mode: string) {
    this.paymentMode = mode;
  }
  // Fonction pour gérer le changement de mode de paiement
  onPaymentModeChange(mode: string) {
    this.paymentMode = mode;
  }

// PassersCommande PassersCommande PassersCommande
  // PassersCommande PassersCommande PassersCommande
  PassersCommande() {
    if (this.paymentMode === 'card') {
      console.log('Paiement par carte confirmé', this.cardDetails);
    } else {
      console.log('Paiement à la livraison sélectionné');
    }


// Créer un objet commande
const commande: Commande = {
  name: this.deliveryInfos.name,
  phone: this.deliveryInfos.phone, // Si c'est le téléphone, ajustez en fonction
  wilaya: this.deliveryInfos.wilaya,
  commune: this.deliveryInfos.commune,
  address: this.deliveryInfos.address, // Assurez-vous que cette propriété est correctement définie

  totalPrice: this.total + this.deliveryFee, // Ajouter les frais de livraison
  status: 'En cours',
  orderDate: new Date().toISOString(),   // Format ISO
 
 // Créez un tableau d'articles pour le panier
 panier: this.items

};
console.log("la commde envoyer est :"+JSON.stringify(commande))
// Soumettre la commande via le service

this.orderservice.PasserCommande(commande).subscribe(
  response => {
      if (response.commandestate==="succes") {

          console.log('Commande soumise avec succès', response);          
         // stocker les information de client 
          localStorage.setItem('clientPhone', this.deliveryInfos.phone);
          localStorage.setItem('clientName', this.deliveryInfos.name);
          localStorage.setItem('clientWilaya', this.deliveryInfos.wilaya);     
          
                
          
          
          this.showsuccess();
          this.clearCart() ;
         

      } else {
          console.error('Erreur lors de la soumission de la commande');
      }
  },
  error => {
      console.error('Erreur lors de la soumission de la commande', error);
      // Afficher un message à l'utilisateur ici
  }
);





  }
  showsuccess(){
    // Vérifier si le panier est vide
  
    Swal.fire({
      icon: 'success',
      title: 'Commande prise en charge',
      text: 'Merci pour votre commande ! Votre commande a été validée avec succès et est en cours de traitement. Vous recevrez bientôt une confirmation par telephone.',
      confirmButtonText: 'Voir mes commandes',
  }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['/orders']); // Redirige vers la page des commandes
      }
  });
  
    
    
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  clearCart() {
   this.cartService.clearCart();
   this.calculateTotal();
   console.log('le panier apres vider '+ this.items);
   this.router.navigate(['/product']);
  }


}
