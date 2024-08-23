import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.css'
})
export class ProjetComponent {
  projets = [
    { id: 1, nom: 'Confection des tenues scolaires', votes: 5000, statut: 'Proposé' },
    { id: 2, nom: 'Construction d\'écoles', votes: 3000, statut: 'En cours' },
    // Autres projets...
  ];
  constructor(private router: Router) {}

  voirDetails(id: number): void {
    this.router.navigate(['/projet/detail/projet',id]);
  }

  modifierProjet(id: number): void {
    this.router.navigate(['/projet/modifier', id]);
  }

}
