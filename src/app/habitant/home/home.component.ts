import { Component, OnInit } from '@angular/core';
import { ProjetsService } from '../../Services/projets.service';
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
  municipaliteId: number = 5; // Remplace par l'ID de la municipalité de l'habitant connecté

  constructor(private projetsService: ProjetsService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetsService.getProjetsByMunicipalite(this.municipaliteId).subscribe(
      response => {
        this.projets = response.data;
      },
      error => {
        console.error('Erreur lors du chargement des projets:', error);
      }
    );
  }
}
