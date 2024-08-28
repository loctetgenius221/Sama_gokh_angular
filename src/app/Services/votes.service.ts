import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

// Méthode pour obtenir tous les votes
getAllVotes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/votes`, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur lors de la requête:', error);
      return this.handleError(error);
    })
  );
}
 // Méthode pour récupérer les votes 'contre'
 getVotesContre(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/votes/contre` , { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur lors de la requête:', error);
      return this.handleError(error);
    })
  );
}
 
 // Méthode pour obtenir le vote d'un utilisateur spécifique pour un projet
 getUserVote(projectId: number, userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/votes/user/${userId}/${projectId}`, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur lors de la récupération du vote de l\'utilisateur:', error);
      return this.handleError(error);
    })
  );
}

  addVote(Vote: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/votes`, Vote, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateVote(id: number, Vote: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/votes/${id}`, Vote, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteVote(id: number): Observable<any> {
    console.log(`Envoi de la requête de suppression pour l'ID : ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/votes/${id}`, { headers: this.getHeaders() }).pipe(
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
