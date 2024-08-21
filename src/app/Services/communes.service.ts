import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunesService {
  private apiUrl = 'http://127.0.0.1:8000/api/municipalites'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    console.log('Token:', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCommunes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addCommune(commune: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, commune, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
    if (error.error && error.error.errors) {
      console.error('Erreurs de validation:', error.error.errors);
    }
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
  
}
