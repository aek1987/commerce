import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';
import { Wilaya } from '../modeles/Wilaya.model';
import { Panier } from '../modeles/Panier.model';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent  implements OnInit{
  deliveryFee: number = 0; // Exemple de frais de livraison fixe
  items: Panier []=[];  // Obtenir les produits du panier
  total :number=0; // Calculer le total
   // Exemple de montant total à payer
   ngOnInit(): void {
    // S'abonner aux changements des items
    this.cartService.items$.subscribe(items => {
     this.items = items;
    });

    // S'abonner aux changements du total
    this.cartService.total$.subscribe(total => {
      this.total = total;
    });
     console.log('Page de confirmation chargée');
   
 
 }

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
  selectedCommunes: string[] = [];
  paymentMode: string = 'cash'; // Par défaut, paiement par carte
  constructor(private paymentService: PaymentService,private router: Router,private cartService: CartService ) {}
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

// S'abonner aux changements du total du panier
this.cartService.total$.subscribe(total => {
  // Ajouter les frais de livraison au total
  this.total = total + this.deliveryFee;
});

console.log('Page de confirmation chargée');

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

  confirmPayment() {
    if (this.paymentMode === 'card') {
      console.log('Paiement par carte confirmé', this.cardDetails);
    } else {
      console.log('Paiement à la livraison sélectionné');
    }
  }
}
