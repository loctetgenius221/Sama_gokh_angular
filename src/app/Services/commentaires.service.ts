import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCommentaires(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/commentaires`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        return this.handleError(error);
      })
    );
  }
  
  
  

  getCommentaireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/commentaires/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addCommentaire(Commentaire: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/commentaires`, Commentaire, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateCommentaire(commentaire: any): Observable<any> {
    const commentaireId = commentaire.id; // Suppose que l'objet Commentaire a un champ id
    return this.http.put<any>(`${this.apiUrl}/Commentaires/${commentaireId}`, commentaire, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  


  deleteCommentaire(id: number): Observable<any> {
    console.log(`Envoi de la requête de suppression pour l'ID : ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/commentaires/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Erreur côté client:', error.error.message);
    } else {
      console.error(`Erreur côté serveur: ${error.status}, ` + `Message: ${error.error}`);
    }
    return throwError('Quelque chose s\'est mal passé; veuillez réessayer plus tard.');
  }
}
