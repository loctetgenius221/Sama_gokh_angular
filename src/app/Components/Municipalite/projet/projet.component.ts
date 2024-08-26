import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service'; // Assurez-vous que le chemin est correct
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: any[] = []; // Propriété pour stocker la liste des projets
  filteredProjets: any[] = []; // Propriété pour stocker les projets filtrés
  selectedFilter: string = ''; // Critère de filtrage sélectionné
  filterValue: string = ''; // Valeur de filtrage saisie

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
        this.projets = response.data;
        this.filteredProjets = response.data; // Initialiser les projets filtrés
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    });
  }

  onFilterChange(): void {
    this.filterValue = ''; // Réinitialisez la valeur du filtre lorsque le critère change
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.selectedFilter || !this.filterValue) {
      this.filteredProjets = this.projets;
    } else {
      this.filteredProjets = this.projets.filter(projet => {
        const value = projet[this.selectedFilter]?.toLowerCase();
        return value ? value.includes(this.filterValue.toLowerCase()) : false;
      });
    }
  }

  getPlaceholder(): string {
    switch (this.selectedFilter) {
      case 'nom': return 'Entrez le nom du projet';
      // Ajoutez d'autres placeholders si nécessaire
      default: return '';
    }
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
            this.projets = this.projets.filter(projet => projet.id !== id);
            this.filteredProjets = this.filteredProjets.filter(projet => projet.id !== id);
            
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
