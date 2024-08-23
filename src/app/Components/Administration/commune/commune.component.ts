import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunesService } from '../../../Services/communes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  itemsPerPage: number = 10; // Ajustez cette valeur en fonction du nombre de communes par page souhaité
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commune ?')) {
      this.communesService.deleteCommune(id).subscribe(
        () => {
          this.communes = this.communes.filter(commune => commune.id !== id);
          this.filteredCommunes = this.filteredCommunes.filter(commune => commune.id !== id);
          this.totalCommunes = this.communes.length;
          alert('Commune supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la commune:', error);
          alert('Erreur lors de la suppression de la commune');
        }
      );
    }
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
