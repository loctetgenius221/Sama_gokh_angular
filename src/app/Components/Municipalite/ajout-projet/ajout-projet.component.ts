import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjetsService } from '../../../Services/projets.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ajout-projet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
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
      statut: ['en-attente', Validators.required], // Valeur par défaut 'en-attente'
      photo: [null],
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
  
          // Afficher SweetAlert de succès
          Swal.fire({
            icon: 'success',
            title: 'Projet ajouté',
            text: 'Le projet a été ajouté avec succès!',
            showConfirmButton: false,
            timer: 2000 // L'alerte disparaît après 2 secondes
          });
  
          // Naviguer vers une autre page après un petit délai pour que l'utilisateur puisse voir l'alerte
          setTimeout(() => {
            this.router.navigate(['/sidebar1/projet']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du projet:', error);
  
          // Afficher SweetAlert d'erreur
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout du projet.',
            showConfirmButton: false,
            timer: 3000 // L'alerte disparaît après 3 secondes
          });
        }
      });
    }
  }
  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.projetForm.patchValue({
        photo: file
      });
    }
  }
}
