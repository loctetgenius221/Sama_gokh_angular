import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjetsService } from '../../../Services/projets.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-projet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent {
  projetForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private projetsService: ProjetsService
  ) {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      budget: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['', Validators.required],
      photo: [null], // Pour les fichiers, le laisser null au début
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const formData = new FormData();

      // Ajout des données du formulaire au FormData
      formData.append('nom', this.projetForm.get('nom')?.value);
      formData.append('budget', this.projetForm.get('budget')?.value);
      formData.append('date_debut', this.projetForm.get('dateDebut')?.value);
      formData.append('date_fin', this.projetForm.get('dateFin')?.value);
      formData.append('statut', this.projetForm.get('statut')?.value);
      formData.append('description', this.projetForm.get('description')?.value);
      formData.append('etat', 'approuvé'); // Etat par défaut

      const fileInput = this.projetForm.get('photo')?.value;
      if (fileInput) {
        formData.append('photo', fileInput);
      }

      this.projetsService.addProjet(formData).subscribe({
        next: (response) => {
          console.log('Projet ajouté avec succès:', response);
          this.router.navigate(['/sidebar1/projet']); // Rediriger après ajout
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du projet:', error);
        }
      });
    }
  }

  // Méthode pour gérer la sélection de fichiers
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.projetForm.patchValue({
        photo: file
      });
    }
  }
}
