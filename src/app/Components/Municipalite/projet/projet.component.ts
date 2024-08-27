import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ProjetsService } from '../../../Services/projets.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: any[] = [];
  filteredProjets: any[] = [];
  selectedFilter: string = '';
  filterValue: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0; // Déclaration de la propriété

  constructor(
    private router: Router,
    private projetsService: ProjetsService
  ) {}

  ngOnInit(): void {
    this.getProjets();
  }

  getProjets(): void {
    this.projetsService.getAllProjets().subscribe({
      next: (response) => {
        this.projets = response.data;
        this.filteredProjets = response.data;
        this.totalPages = this.calculateTotalPages(); // Calcul du nombre total de pages
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    });
  }

  calculateTotalPages(): number {
    return Math.ceil(this.filteredProjets.length / this.itemsPerPage);
  }

  onFilterChange(): void {
    this.filterValue = '';
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
    this.totalPages = this.calculateTotalPages(); // Mettre à jour le nombre total de pages après le filtrage
    this.currentPage = 1;
  }

  paginatedFilteredProjets(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProjets.slice(start, end);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getPlaceholder(): string {
    switch (this.selectedFilter) {
      case 'nom': return 'Entrez le nom du projet';
      case 'budget': return 'Entrez le budget du projet';
      case 'statut': return 'Entrez le statut du projet';
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
            this.applyFilters();
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'Le projet a été supprimé avec succès.',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error: (error: any) => {
            console.error('Erreur lors de la suppression du projet:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression du projet.',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    });
  }
}
