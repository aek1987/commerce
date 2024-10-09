import { Component } from '@angular/core';
import { PaymentService } from '../service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {

  deliveryInfo = { name: 'aa', address: 'aa', phone: 'aa' };
  cardDetails = { number: 'aa', expiry: 'aa', cvv: 'aa' };
  total: number = 0; // Exemple de montant total à payer

  constructor(private paymentService: PaymentService,private router: Router ) {}

  onSubmit() {
    // Soumettre les informations de livraison
    console.log('Informations de livraison:', this.deliveryInfo);
  }

  // Méthode pour confirmer le paiement
  confirmPayment() {
    this.paymentService.processPayment(this.total, this.cardDetails).subscribe(success => {
      if (success) {
        console.log('Paiement réussi');
        //Rediriger vers la page de confirmation ou autre action
        this.router.navigate(['/orders']);
      } else {
        console.error('Paiement échoué');
      }
    });
  }
}
