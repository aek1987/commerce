// models/order.model.ts

  export interface Order {
    id: number;            // Identifiant unique de la commande
    userId: number;        // Identifiant de l'utilisateur
    products: { 
      productId: number; 
      quantity: number;
    }[];                   // Liste des produits avec ID et quantité
    totalPrice: number;    // Prix total de la commande
    status: string;        // Statut de la commande (e.g. "En cours", "Livrée")
    orderDate: Date;       // Date de la commande
    customerName: string;
    customerEmail: string;
    address: string;
  }
  