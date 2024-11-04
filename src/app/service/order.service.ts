// services/order.service.ts
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Order, OrderDatabase } from '../modeles/order.model';
import { Commande } from '../modeles/commande';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modeles/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);  
  orders$ = this.ordersSubject.asObservable();
  private apiuserdetail = 'https://server-products-s1kr.onrender.com/api/clients';
  private apiuser = 'https://server-products-s1kr.onrender.com/api/clientstel';
  private apiUrl = 'https://server-products-s1kr.onrender.com/api/commande_client';
  private apiProduitCommande = 'https://server-products-s1kr.onrender.com/api/produit_commandes';
  private apicommande = 'https://server-products-s1kr.onrender.com/api/orders';
  private apiItems = 'https://server-products-s1kr.onrender.com/api/orders';
 
 
  constructor(private http: HttpClient) {}

//Fetch client ID from the API using the phone number
  getClientIDByPhone(phone: string): Observable<any> {
   
    return this.http.get<any>(`${this.apiuser}/${phone}`);
  }
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


  // Ajouter une nouvelle commande
  PasserCommande(commande: Commande) : Observable<any>{
    
    return this.http.post<Commande>(this.apicommande, commande);

  }

  //obtenir toutes les commandes d'un utilisateur
   getUserOrdersById(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${userId}`);
  }

  //obtenir toutes les commandes dans la platforme
  getALLOrders(): Observable<any> {
    return this.http.get<OrderDatabase[]>(`${this.apicommande}`);
  }
  //obtenir toutes les commandes d'un utilisateur
  getInfoCustomer(userId: String): Observable<any> {
   
    return this.http.get<any>(`${this.apiuserdetail}/${userId}`);
  }
  
  loadProductsOrderItems(orderid: String): Observable<any> {
       return this.http.get<any>(`${this.apiProduitCommande}/${orderid}`);
  }
  

    // Supprimer un produit par ID
  cancelOrder(id: number): Observable<void> {
      
    //this.http.deleteItems<id>(`${this.apicommande}/${id}`);
    return this.http.delete<void>(`${this.apicommande}/${id}`);
    }
     // Supprimer un produit par ID
  deleteItems(id: number): Observable<void> {
        
    return this.http.delete<void>(`${this.apiItems}/${id}`);
    }

}
