import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: any[] = []; // Propriété pour stocker la liste des projets

  constructor(
    private router: Router,
    private projetsService: ProjetsService // Injecter le service ici
  ) {}

  ngOnInit(): void {
    this.getProjets(); // Appeler la méthode pour récupérer les projets au chargement du composant
  }
  getProjets(): void {
    this.projetsService.getAllProjets().subscribe({
      next: (response) => {
        // response.data est le tableau contenant les projets
        this.projets = response.data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    });
  }
  

 
  supprimerProjet(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetsService.deleteProjet(id).subscribe({
        next: () => {
          // Supprimer le projet de la liste sans recharger la page
          this.projets = this.projets.filter(projet => projet.id !== id);
        },
        error: (error: any) => { // Typage explicite de l'erreur
          console.error('Erreur lors de la suppression du projet:', error);
        }
      });
    }
  }
}
