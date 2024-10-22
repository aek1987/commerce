import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modeles/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private apiUrl = 'http://localhost:3000/products';  // Local json-server URL 
  private apiUrl = 'https://server-products-s1kr.onrender.com/api/products';  // remote json-server URL
  constructor(private http: HttpClient) {}

  // Fetch products from the API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Ajouter un produit
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
   // Supprimer un produit par ID
   deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
