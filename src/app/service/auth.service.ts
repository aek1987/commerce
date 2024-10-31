import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';  // Assurez-vous que cette URL est correcte
  private userRole: string | null = null;
  constructor(private http: HttpClient) {

    this.userRole = localStorage.getItem('userRole');
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => {
        // Sauvegarder le token reçu après connexion réussie
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

// Enregistre l'utilisateur dans localStorage
register(user: any): boolean {
  const existingUser = localStorage.getItem(user.email);
  if (existingUser) {
    return false; // L'utilisateur existe déjà
  }
  localStorage.setItem(user.email, JSON.stringify(user)); // Enregistre l'utilisateur
  return true;
}

  isAdmin(): boolean {
    return localStorage.getItem('userRole')=== 'admin';/// renvoi true if amdin
  }
}
