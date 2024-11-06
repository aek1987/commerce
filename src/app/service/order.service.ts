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
  private ordersSubject = new BehaviorSubject<Order[]>([]);  
  orders$ = this.ordersSubject.asObservable();
  private URL='https://server-products-s1kr.onrender.com/api';
  private apiuserdetail = `${this.URL}/clients`;
  private apiuser = `${this.URL}/clientstel`;
  private apiUrl = `${this.URL}/commande_client`;
  private apiProduitCommande = `${this.URL}/produit_commandes`;
  private apicommande = `${this.URL}/orders`;
  private apiItems = `${this.URL}/Items`;
  
 
 
  constructor(private http: HttpClient) {}

//Fetch client ID from the API using the phone number
  getClientIDByPhone(phone: string): Observable<any> {
   
    return this.http.get<{ id: number }>(`${this.apiuser}/${phone}`);
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
   getUserOrdersById(userId: number): Observable<OrderDatabase[]> {
    return this.http.get<OrderDatabase[]>(`${this.apiUrl}/${userId}`);
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
  

    // oder changeState
    changeState(id: number): Observable<void> {
         
    return this.http.get<void>(`${this.apicommande}/${id}/${id}`);
    }
        // Supprimer un produit par ID
  cancelOrder(id: number): Observable<void> {
         
    return this.http.delete<void>(`${this.apicommande}/${id}`);
    }
     // Supprimer un produit par ID
  deleteItems(id: number): Observable<void> {
        
    return this.http.delete<void>(`${this.apiItems}/${id}`);
    }

}
