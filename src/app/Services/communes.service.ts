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
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCommunes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getCommuneById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addCommune(commune: any): Observable<any> {
    return this.http.post(this.apiUrl, commune, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateCommune(id: number, commune: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, commune, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommune(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}
