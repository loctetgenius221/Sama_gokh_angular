import { Component} from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajout-projet',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ajout-projet.component.html',
  styleUrl: './ajout-projet.component.css'
})
export class AjoutProjetComponent {
  constructor(private router: Router) {}

  // Méthode pour annuler et retourner à la liste des projets
  onCancel() {
    this.router.navigate(['/projet']);
  }

  // Ajoute ici la logique pour soumettre le formulaire
  onSubmit() {
    // Logique pour ajouter un projet (à définir)
    this.router.navigate(['/projet']);
  }
}

