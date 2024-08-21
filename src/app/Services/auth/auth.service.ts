import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, from } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';  

  private authSubject = new BehaviorSubject<string | null>(this.getToken()); // Initialise avec le token existant
  private refreshSubject = new BehaviorSubject<boolean>(false); // Subject pour gérer les rafraîchissements

  constructor(private http: HttpClient) {}

  // Enregistrer un nouvel utilisateur
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Connexion de l'utilisateur
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        this.storeToken(response.access_token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Déconnexion de l'utilisateur
  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
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
    return this.http.get(`${this.apiUrl}/user`, { headers: this.createAuthorizationHeader() }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.refreshToken().pipe(
            switchMap(() => this.http.get(`${this.apiUrl}/user`, { headers: this.createAuthorizationHeader() })),
            catchError(this.handleError)
          );
        }
        return throwError(() => error);
      })
    );
  }

  // Rafraîchir le token
  private refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for refresh.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { headers }).pipe(
      map((response: any) => {
        this.storeToken(response.access_token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Créer un en-tête d'autorisation
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Stocker le token dans le stockage local et mettre à jour le sujet comportemental
  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.authSubject.next(token);
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
