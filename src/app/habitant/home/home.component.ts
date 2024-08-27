import { Component, OnInit } from '@angular/core';
import { ProjetsService } from '../../Services/projets.service';
import { AuthService } from '../../Services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habitant-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HabitantHomeComponent implements OnInit {
  projets: any[] = [];
  paginatedProjets: any[] = [];  // Pour stocker les projets paginés
  currentPage: number = 1;        // Page actuelle
  itemsPerPage: number = 3;       // Nombre d'éléments par page
  totalPages: number = 0;         // Nombre total de pages
  municipaliteId: number | undefined; 
  searchTerm: string = '';        // Valeur de recherche

  constructor(
    private projetsService: ProjetsService,
    private authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        this.municipaliteId = userDetails.data.municipalite_id;
        this.loadProjets();
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }

  loadProjets(): void {
    if (this.municipaliteId) {
      this.projetsService.getProjetsByMunicipalite(this.municipaliteId).subscribe(
        response => {
          const baseUrl = 'http://127.0.0.1:8000/storage/photos/'; 
          this.projets = response.data.map(projet => ({
            ...projet,
            photo: projet.photo ? baseUrl + projet.photo : 'https://via.placeholder.com/300x200'
          }));

          // Application de la recherche
          this.applySearch();
        },
        error => {
          console.error('Erreur lors du chargement des projets:', error);
        }
      );
    } else {
      console.error('ID de municipalité non disponible.');
    }
  }

  applySearch(): void {
    const filteredProjets = this.projets.filter(projet =>
      projet.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      projet.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  

    // Configuration de la pagination
    this.totalPages = Math.ceil(filteredProjets.length / this.itemsPerPage);
    this.currentPage = 1; // Réinitialiser la page courante
    this.updatePaginatedProjets(filteredProjets);
  }

  updatePaginatedProjets(filteredProjets: any[] = this.projets): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjets = filteredProjets.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applySearch(); // Appliquer la recherche après changement de page
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applySearch(); // Appliquer la recherche après changement de page
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.applySearch(); // Appliquer la recherche après changement de page
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
