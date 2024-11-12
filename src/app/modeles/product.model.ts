// src/app/product.model.ts
export interface Product {
  id: number;            // Identifiant unique du produit
  name: string;          // Nom du produit
  price: number;         // Prix du produit
  description: string;   // Description du produit
  image: string;         // URL de l'image du produit
  category: string;  
  
  
  // Catégorie du produit
}
  
export interface newProduct  {
  id: number;            // Identifiant unique du produit
  name: string;          // Nom du produit
  price: number;         // Prix du produit
  description: string;   // Description du produit
  image: string;         // URL de l'image du produit
  category: string;   
  ecran: string,
  processor: string,
  os: string,
  storage: string,
  ram: string,
  battery: string,
  wirelessCharging: string,
  color: string,
  dualSim: false
};
