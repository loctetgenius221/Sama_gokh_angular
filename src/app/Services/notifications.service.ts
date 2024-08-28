import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
 // Méthode pour obtenir toutes les notifications
 // Exemple de méthode getAllNotifications dans NotificationsService
 getAllNotifications(): Observable<any[]> {
  return this.http.get<{ status: boolean; data: any[] }>(`${this.apiUrl}/notifications`, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur lors de la requête:', error);
      return this.handleError(error);
    }),
    map(response => response.data) // Extraire la propriété data
  );
}


deleteNotification(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/notifications/${id}`, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Erreur lors de la suppression de la notification:', error);
      return this.handleError(error);
    })
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
