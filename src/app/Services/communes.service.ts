import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunesService {

  private apiUrl = 'http://127.0.0.1:8000/api/municipalites'; 

  constructor(private http: HttpClient) { }

  getAllCommunes() {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCommuneById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCommune(commune: any) {
    return this.http.post(this.apiUrl, commune).pipe(
      catchError(this.handleError)
    );
  }

  updateCommune(id: number, commune: any) {
    return this.http.put(`${this.apiUrl}/${id}`, commune).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommune(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur s\'est produite:', error);
    return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
  }
}