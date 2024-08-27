import { Component, OnInit } from '@angular/core';
import { ProjetsService } from '../../Services/projets.service'; 
import { AuthService } from '../../Services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-habitant-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HabitantHomeComponent implements OnInit {
  projets: any[] = [];
  municipaliteId: number | undefined; 

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
        },
        error => {
          console.error('Erreur lors du chargement des projets:', error);
        }
      );
    } else {
      console.error('ID de municipalité non disponible.');
    }
  }
  
  
}
