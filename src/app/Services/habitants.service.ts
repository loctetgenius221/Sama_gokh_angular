import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitantsService {

  private apiUrl = 'http://127.0.0.1:8000/api/habitants'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllhabitants(): Observable<{ status: boolean; message: string; data: any[] }> {
    return this.http.get<{ status: boolean; message: string; data: any[] }>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}