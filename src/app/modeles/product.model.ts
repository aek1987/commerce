// src/app/product.model.ts
export interface Product {
  id: number;            // Identifiant unique du produit
  name: string;          // Nom du produit
  price: number;         // Prix du produit
  description: string;   // Description du produit
  image: string;         // URL de l'image du produit
  category: string;  // Catégorie du produit
}
  