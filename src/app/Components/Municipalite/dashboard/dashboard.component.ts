import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';

import { CommunesService } from '../../../Services/communes.service';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  departement: string = '';
  region: string = '';

  constructor(private communesService: CommunesService,private router: Router) { }

  ngOnInit(): void {
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.departement = data.departement;
        this.region = data.region;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité :', error);
      }
    );
  }
  
  projets = [
    { id: 1, nom: 'Confection des tenues scolaires', date_debut: '2024/07/01', date_fin:'2024/10/01', budget:1000000 },
    { id: 2, nom: 'Construction d\'écoles', date_debut: '2024/08/01', date_fin:'2024/11/01', budget:1500000 },
  ];

  projets_habitants = [
    {id:1, nom: 'Ville Verte et Connecté',proprietaire: 'Moussa Sagna',profession:'Etudiant'},
    {id:2, nom: 'Ecole de Santé',proprietaire: 'Aissatou Diop',profession:'Infirmier'}
  ];

 

  voirDetails(id: number): void {
    this.router.navigate(['/projet/detail/projet',id]);
    this.router.navigate(['/habitant/detail/projet',id]);
  }

  

}
