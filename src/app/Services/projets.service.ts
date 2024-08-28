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

  getAllProjets(): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/projets`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        return this.handleError(error);
      })
    );
  }
  getProjetsByMunicipalite(municipaliteId: number): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/projets/municipalite/${municipaliteId}`, { headers: this.getHeaders() }).pipe(
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

  addProjet(projet: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projets`, projet, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateProjet(projet: FormData): Observable<any> {
    const projetId = projet.get('id');
    if (!projetId) {
        console.error('Project ID is undefined');
        return throwError('Project ID is undefined');
    }
    return this.http.put<any>(`${this.apiUrl}/projets/${projetId}`, projet, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
}

updateEtatProjet(id: number, etat: string): Observable<any> {
  const data = { etat };
  return this.http.put<any>(`${this.apiUrl}/projets/${id}/etat`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
  );
}

  getProjetsByHabitant(habitantId: number): Observable<{ data: any[] }> {
    console.log(`Envoi de la requête pour obtenir les projets de l'habitant avec l'ID : ${habitantId}`);
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/projets/habitant/${habitantId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        return this.handleError(error);
      })
    );
  }
  
  
  

  deleteProjet(id: number): Observable<any> {
    console.log(`Envoi de la requête de suppression pour l'ID : ${id}`);
    return this.http.delete<any>(`${this.apiUrl}/projets/${id}`, { headers: this.getHeaders() }).pipe(
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
