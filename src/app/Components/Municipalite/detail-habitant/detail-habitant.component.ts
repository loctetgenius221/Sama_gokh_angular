import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici

@Component({
  selector: 'app-detail-habitant',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './detail-habitant.component.html',
  styleUrl: './detail-habitant.component.css'
})
export class DetailHabitantComponent {
  projets = [
    { id: 1, nom: 'Ville Verte et Connectée' },
  ];

  habitant = {
    nom: 'Sagna',
    prenom: 'Moussa',
    age: 25,
    sexe: 'Masculin',
    telephone: '77 000 00 00',
    email: 'sagna@gmail.com',
    adresse: 'Parcelles Assainies unité 26 n° 260',
    nin: '1 000 2001 00000',
    photo: 'https://via.placeholder.com/100',
    profession: 'Etudiant'
  };

  voirDetails(projetId: number): void {
    
  }
}

