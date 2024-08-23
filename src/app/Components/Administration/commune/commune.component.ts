import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunesService } from '../../../Services/communes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commune',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {
  communes: any[] = [];
  filteredCommunes: any[] = [];
  selectedFilter: string = '';  // Critère de filtrage sélectionné
  filterValue: string = '';     // Valeur de filtrage saisie
  totalCommunes: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 5; // Ajustez cette valeur en fonction du nombre de communes par page souhaité
  paginatedCommunes: any[] = [];
  totalPages: number = 0;

  constructor(private communesService: CommunesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCommunes();
  }

  loadCommunes(): void {
    this.communesService.getAllCommunes().subscribe(
      (data) => {
        console.log('Communes Data:', data);
        this.communes = data;
        this.filteredCommunes = data;
        this.totalCommunes = data.length;

           // Configurer la pagination
           this.totalPages = Math.ceil(this.communes.length / this.itemsPerPage);
           this.updatePaginatedCommunes();
      },
      (error) => {
        console.error('Erreur lors du chargement des communes:', error);
      }
    );
  }


  
deleteCommune(id: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.communesService.deleteCommune(id).subscribe(
        () => {
          this.communes = this.communes.filter(commune => commune.id !== id);
          this.filteredCommunes = this.filteredCommunes.filter(commune => commune.id !== id);
          this.totalCommunes = this.communes.length;
          
          // Afficher une alerte de succès avec SweetAlert2
          Swal.fire({
            title: 'Supprimée !',
            text: 'La commune a été supprimée avec succès.',
            icon: 'success',
            timer: 3000, // Afficher pendant 3 secondes
            showConfirmButton: false
          });
        },
        (error) => {
          console.error('Erreur lors de la suppression de la commune:', error);
          
          // Afficher une alerte d'erreur avec SweetAlert2
          Swal.fire({
            title: 'Erreur !',
            text: 'Erreur lors de la suppression de la commune.',
            icon: 'error',
            timer: 3000, // Afficher pendant 3 secondes
            showConfirmButton: false
          });
        }
      );
    }
  });
}

  navigateToAddCommune(): void {
    this.router.navigate(['/sidebar/commune/add']);
  }

  showHabitants(communeId: number): void {
    this.router.navigate(['/sidebar/utilisateurs', communeId]);
  }

  onFilterChange(): void {
    this.filterValue = ''; // Réinitialisez la valeur du filtre lorsque le critère change
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.selectedFilter || !this.filterValue) {
      this.filteredCommunes = this.communes;
      return;
    }

    this.filteredCommunes = this.communes.filter(commune => {
      const value = commune[this.selectedFilter]?.toLowerCase();
      return value ? value.includes(this.filterValue.toLowerCase()) : false;
    });
  }

  getPlaceholder(): string {
    switch (this.selectedFilter) {
      case 'nom_commune': return 'Entrez le nom de la commune';
      case 'region': return 'Entrez la région';
      case 'departement': return 'Entrez le département';
      default: return '';
    }
  }

  updatePaginatedCommunes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCommunes = this.communes.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCommunes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCommunes();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedCommunes();
  }

  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
