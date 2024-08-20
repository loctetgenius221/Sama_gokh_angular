import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';  // Importer throwError
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';  

  private authSubject = new BehaviorSubject<string | null>(this.getToken()); // Initialise avec le token existant

  constructor(private http: HttpClient) {}

  // Enregistrer un nouvel utilisateur
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Connexion de l'utilisateur
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        // Enregistre le token d'authentification dans le stockage local
        localStorage.setItem('auth_token', response.access_token);
        // Met à jour le sujet comportemental avec le nouveau token
        this.authSubject.next(response.access_token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Déconnexion de l'utilisateur
  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      // Si aucun token n'est disponible, vous ne pouvez pas procéder à la déconnexion
      return throwError(() => new Error('No token available for logout.'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/logout`, { headers }).pipe(
      map(() => {
        this.clearSession();
      }),
      catchError(this.handleError)
    );
  }

  // Obtenir les détails de l'utilisateur connecté
  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  // Obtenir le token de l'utilisateur
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Supprimer le token localement
  clearSession(): void {
    localStorage.removeItem('auth_token');
    this.authSubject.next(null);
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(() => new Error('An error occurred'));
  }
}
