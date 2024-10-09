import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  // Simulation du traitement du paiement
  processPayment(amount: number, cardDetails: any): Observable<boolean> {
    // Simuler un délai de traitement
    return of(true); // Toujours renvoyer 'true' comme paiement réussi
  }
}
