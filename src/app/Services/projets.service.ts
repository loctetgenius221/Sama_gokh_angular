import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projets`).pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error); 
        return this.handleError(error);
      })
    );
  }

  getProjetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projets/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addProjet(Projet: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projets`, Projet, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateProjet(id: number, Projet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projets/${id}`, Projet, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProjet(id: number): Observable<any> {
    console.log(`Envoi de la requête de suppression pour l'ID : ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/projets/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error.message); // Ajoutez cette ligne pour plus d'infos
    if (error.error && error.error.errors) {
      console.error('Erreurs de validation:', error.error.errors);
    }
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}
