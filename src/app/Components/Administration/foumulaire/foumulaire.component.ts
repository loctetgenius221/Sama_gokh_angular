import { Component } from '@angular/core';
import { CommunesService } from '../../../Services/communes.service';  // Vérifiez le chemin correct
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-foumulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './foumulaire.component.html',
  styleUrls: ['./foumulaire.component.css']
})
export class FoumulaireComponent {
  communeForm: FormGroup;

  constructor(private communesService: CommunesService, private fb: FormBuilder) {
    this.communeForm = this.fb.group({
      nom_commune: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      departement: ['', Validators.required],
      region: ['', Validators.required]
    });
    
  }

  onSubmit(): void {
    if (this.communeForm.valid) {
      console.log('Formulaire valide:', this.communeForm.value); // Affiche les données du formulaire
      this.communesService.addCommune(this.communeForm.value).subscribe(
        (response) => {
          console.log('Commune ajoutée avec succès:', response);
          this.communeForm.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la commune:', error);
        }
      );
    } else {
      console.log('Formulaire invalide:', this.communeForm.errors); // Affiche les erreurs de validation du formulaire
    }
  }
  

  goBack(): void {
    history.back();


  }
}
