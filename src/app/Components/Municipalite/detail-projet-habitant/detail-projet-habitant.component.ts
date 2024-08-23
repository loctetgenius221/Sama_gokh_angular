import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr'

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-detail-projet-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detail-projet-habitant.component.html',
  styleUrls: ['./detail-projet-habitant.component.css']
})
export class DetailProjetHabitantComponent implements OnInit {
  projetId!: string;
  projetDetails: any; // Utilisez un type approprié pour les détails du projet

  habitant = {
    id: '1'
  };

  // Données statiques pour exemple
  staticProjects = [
    { id: '1', nom: 'Ville Verte et Connectée', statut: 'proposé', dateDebut: '2024-09-01', dateFin: '2024-11-01', budget: 3000000,  description: 'Description plus approfondie avec les étapes importantes, les parties prenantes, et les bénéfices attendus pour la communauté.'},
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projetId = this.route.snapshot.paramMap.get('id')!;
    this.loadDetails();
  }

  loadDetails(): void {
    this.projetDetails = this.staticProjects.find(p => p.id === this.projetId);
  }
}
