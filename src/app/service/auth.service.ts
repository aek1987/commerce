import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';  // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

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
}
