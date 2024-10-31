// models/order.model.ts

import { Panier } from "./Panier.model";


  export interface Order {
    id: number;            // Identifiant unique de la commande
    userId: number;        // Identifiant de l'utilisateur
    products:Panier[];                   // Liste des produits avec ID et quantité
    totalPrice: number;    // Prix total de la commande
    status: string;        // Statut de la commande (e.g. "En cours", "Livrée")
    orderDate: Date;       // Date de la commande
    customerName: string;
    customerEmail: string;
    address: string;
    showDetails?: boolean; // Propriété facultative pour afficher les détails
  }  
  export interface OrderDatabase {
    id: number;            // Identifiant unique de la commande
    customerId: string; 
    customerName:string,    // Identifiant de l'utilisateur
    totalPrice: number;    // Prix total de la commande
    status: string;        // Statut de la commande (e.g. "En cours", "Livrée")
    orderDate: Date;     // Date de la commande
   
    
  }  
  