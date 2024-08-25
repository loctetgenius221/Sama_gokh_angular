import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service'; // Assurez-vous que le chemin est correct
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projetsService.deleteProjet(id).subscribe({
          next: () => {
            // Supprimer le projet de la liste sans recharger la page
            this.projets = this.projets.filter(projet => projet.id !== id);
            
            // Afficher SweetAlert de succès
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'Le projet a été supprimé avec succès.',
              showConfirmButton: false,
              timer: 2000 // L'alerte disparaît après 2 secondes
            });
          },
          error: (error: any) => {
            console.error('Erreur lors de la suppression du projet:', error);
  
            // Afficher SweetAlert d'erreur
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression du projet.',
              showConfirmButton: false,
              timer: 3000 // L'alerte disparaît après 3 secondes
            });
          }
        });
      }
    });
  }
  
}
