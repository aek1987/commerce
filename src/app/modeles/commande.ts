import { Panier } from "./Panier.model";


  export interface Commande {        
    name: string;
    phone: string;
    wilaya: string,  
    commune:string,
    address: string, 

    totalPrice: number;    // Prix total de la commande
    status: string;        // Statut de la commande (e.g. "En cours", "Livrée")
    orderDate: string;      // Date de la commande

    panier:Panier[];
  }  
  