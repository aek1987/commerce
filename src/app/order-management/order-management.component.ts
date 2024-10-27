
import { Component } from '@angular/core';

interface Produit {
  name: string;
  quantity: number;
  price: number;
}

interface Commande {
  id: number;
  clientName: string;
  date: Date;
  total: number;
  status: string;
  address: string;
  produits: Produit[];
}

@Component({
  selector: 'app-commande',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null; // Pour afficher les détails d'une commande
  // D'autres variables si nécessaire

  constructor() {
    // Simuler des commandes pour l'exemple
    this.commandes = [
      {
        id: 1,
        clientName: 'Ahmed Djebar',
        date: new Date('2024-10-20'),
        total: 4500,
        status: 'En cours',
        address: 'Alger, Alger',
        produits: [
          { name: 'Produit 1', quantity: 2, price: 2000 },
          { name: 'Produit 2', quantity: 1, price: 500 }
        ]
      },
      {
        id: 2,
        clientName: 'Kamel Saadi',
        date: new Date('2024-10-22'),
        total: 6000,
        status: 'Livré',
        address: 'Oran, Oran',
        produits: [
          { name: 'Produit 3', quantity: 1, price: 6000 }
        ]
      },
      {
        id: 3,
        clientName: 'Fatima Zohra',
        date: new Date('2024-10-23'),
        total: 3000,
        status: 'Annulé',
        address: 'Constantine, Constantine',
        produits: [
          { name: 'Produit 4', quantity: 3, price: 1000 }
        ]
      }
    ];
  }

  // Fonction pour afficher les détails d'une commande
  viewDetails(commande: Commande) {
    this.selectedCommande = commande;
  }

  // Fonction pour fermer les détails de la commande
  closeDetails() {
    this.selectedCommande = null;
  }

  // Fonction pour modifier une commande (à implémenter selon ton besoin)
  editCommande(commande: Commande) {
    alert(`Modifier la commande #${commande.id} de ${commande.clientName}`);
    // Implémenter la logique de modification ici
  }

  // Fonction pour annuler une commande (à implémenter selon ton besoin)
  cancelCommande(commande: Commande) {
    if (confirm(`Êtes-vous sûr de vouloir annuler la commande #${commande.id} ?`)) {
      commande.status = 'Annulé';
    }
  }
}
