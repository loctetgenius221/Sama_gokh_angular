import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { ProjetsService } from '../../../Services/projets.service';
import { CommunesService } from '../../../Services/communes.service';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  departement: string = '';
  region: string = '';
  projets: any[] = [];  // Stocke tous les projets
  derniersProjets: any[] = [];  // Stocke les 2 derniers projets
  nombreHabitants: number = 0;  // Stocke le nombre d'habitants

  constructor(
    private communesService: CommunesService,
    private projetsService: ProjetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer les informations de la municipalité connectée
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.departement = data.departement;
        this.region = data.region;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité :', error);
      }
    );

    // Récupérer la liste des habitants et calculer leur nombre
    this.communesService.getHabitantsConnecte().subscribe(
      (habitants) => {
        this.nombreHabitants = habitants.length; // Calculer le nombre d'habitants
      },
      (error) => {
        console.error('Erreur lors de la récupération des habitants :', error);
      }
    );

    // Récupérer les projets
    this.projetsService.getAllProjets().subscribe(
      (response) => {
        this.projets = response.data;
        this.derniersProjets = this.projets
          .sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime())
          .slice(0, 2);
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      }
    );
  }

  projets_habitants = [
    {id:1, nom: 'Ville Verte et Connecté',proprietaire: 'Moussa Sagna',profession:'Etudiant'},
    {id:2, nom: 'Ecole de Santé',proprietaire: 'Aissatou Diop',profession:'Infirmier'}
  ];


  voirDetails(id: number): void {
    this.router.navigate(['/projet/detail/projet', id]);
    this.router.navigate(['/habitant/detail/projet', id]);
  }
}
