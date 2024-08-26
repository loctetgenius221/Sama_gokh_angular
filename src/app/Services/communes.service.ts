import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunesService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCommunes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipalites`).pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        return this.handleError(error);
      })
    );
  }

  getMunicipaliteConnectee(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/municipalite/connectee`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getCommunesByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipalites/region/${region}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getCommuneById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/municipalites/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addCommune(commune: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/municipalites`, commune, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateCommune(id: number, commune: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/municipalites/${id}`, commune, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommune(id: number): Observable<any> {
    console.log(`Envoi de la requête de suppression pour l'ID : ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/municipalites/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getHabitantsConnecte(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipalite/habitants`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error.message);
    if (error.error && error.error.errors) {
      console.error('Erreurs de validation:', error.error.errors);
    }
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}
