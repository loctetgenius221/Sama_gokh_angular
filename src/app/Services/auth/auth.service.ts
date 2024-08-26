import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';  

  private authSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        this.storeToken(response.access_token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

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

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.createAuthorizationHeader() }).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                return this.refreshToken().pipe(
                    switchMap(() => this.getUserDetails())
                );
            }
            return throwError(() => error);
        })
    );
}


  refreshToken(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for refresh.'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/refresh`, {}, { headers }).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          this.storeToken(response.access_token);
          return response.access_token;
        } else {
          throw new Error('No token returned during refresh.');
        }
      }),
      catchError((error) => {
        // Optionnel: rediriger vers la page de login si le refresh échoue
        this.clearSession();
        return throwError(() => error);
      })
    );
  }
  

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.authSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    localStorage.removeItem('auth_token');
    this.authSubject.next(null);
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(() => new Error('An error occurred'));
  }
}
