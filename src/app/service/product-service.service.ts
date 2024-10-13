import { Injectable } from '@angular/core';
import { Product } from '../modeles/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = []; // Simuler une base de données

  constructor() {}

  // Ajouter un produit
  addProduct(product: Product) {
    this.products.push(product);
  }

  // Modifier un produit
  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  // Récupérer tous les produits
  getProducts(): Product[] {
    return this.products;
  }

 // Supprimer un produit par ID
 deleteProduct(id: number): Observable<void> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete<void>(url);
}
}

}
