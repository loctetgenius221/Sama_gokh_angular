import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'https://your-api-url.com/api';  // Remplacez par l'URL de votre API

  // Méthode pour récupérer la liste des projets
  getAllProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects`);
  }

  // Méthode pour récupérer un projet par son ID
  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects/${id}`);
  }

  // Méthode pour ajouter un projet
  createProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, project);
  }

  // Méthode pour modifier un projet
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/${id}`, project);
  }

  // Méthode pour supprimer un projet
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`);
  }
}
