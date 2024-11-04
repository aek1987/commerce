import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newProduct, Product } from '../modeles/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private apiUrl = 'https://server-products-s1kr.onrender.com/api/allproducts';
  private apiUrlProduit = 'https://server-products-s1kr.onrender.com/api/product' ;
  constructor(private http: HttpClient) {}
  
  // Fetch products from the API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductpropertise(id:string): Observable<any> {
    console.log('nekaa :'+`${this.apiUrlProduit}/${id}      }`)
    return this.http.get<any>(`${this.apiUrlProduit}/${id}`);
    
  }
  // Ajouter un produit
  addProduct(product: newProduct): Observable<any> {
    return this.http.post<any>(this.apiUrlProduit, product);
  }
   // Supprimer un produit par ID
   deleteProduct(id: number): Observable<void> {
   // const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(`${this.apiUrlProduit}/${id}`);
  }

}
