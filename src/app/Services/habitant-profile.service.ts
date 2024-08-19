import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitantProfileService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }
  // Récupère les informations du profil de l'habitant
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/habitant/profile`);
  }

  // Met à jour les informations du profil de l'habitant
  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/habitant/profile`, profile);
  }
}

