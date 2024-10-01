import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {

  // Informations de livraison liées au formulaire
  deliveryInfo = {
    name: '',
    address: '',
    phone: ''
  };

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.deliveryInfo.name && this.deliveryInfo.address && this.deliveryInfo.phone) {
      // Afficher les informations de livraison pour la confirmation
      console.log('Informations de livraison:', this.deliveryInfo);

      // Simuler l'enregistrement ou l'envoi des informations de livraison
      alert('Les informations de livraison ont été confirmées avec succès!');
    }
  }
}
