import { Component } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';
import { Wilaya } from '../modeles/Wilaya.model';


@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {

 
  total: number = 0; // Exemple de montant total à payer
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
  constructor(private paymentService: PaymentService,private router: Router ) {}
  onWilayaChange(event: Event) {
    const selectedWilaya = (event.target as HTMLSelectElement).value;
    this.deliveryInfos.wilaya = selectedWilaya;
    
    // Trouver les communes de la wilaya sélectionnée
    const wilaya = this.wilayas.find(w => w.name === selectedWilaya);
    this.selectedCommunes = wilaya ? wilaya.communes : [];
    this.deliveryInfos.commune = ''; // Réinitialiser la commune
  }

  onCommuneChange(event: Event) {
    this.deliveryInfos.commune = (event.target as HTMLSelectElement).value;
  }
 

  onSubmit() {
    // Soumettre les informations de livraison
    console.log('Informations de livraison:', this.deliveryInfos);
  }

   paymentMode: string = 'card'; // Par défaut, paiement par carte
  

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
