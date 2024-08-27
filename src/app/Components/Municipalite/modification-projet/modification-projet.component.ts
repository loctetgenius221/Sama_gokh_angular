import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProjetsService } from '../../../Services/projets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modification-projet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './modification-projet.component.html',
  styleUrls: ['./modification-projet.component.css']
})
export class ModificationProjetComponent implements OnInit {
  projetForm: FormGroup;
  projetId!: number;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private projetsService: ProjetsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      budget: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      statut: ['', Validators.required],
      description: [''],
      photo: [null]
    });
  }

  ngOnInit(): void {
    this.projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projetId) {
      this.loadProjet();
    }
  }

loadProjet(): void {
  this.projetsService.getProjetById(this.projetId).subscribe(
    projet => {
      // Assurez-vous que les dates sont en format 'YYYY-MM-DD' pour les inputs de type date
      const date_debut = projet.date_debut ? new Date(projet.date_debut).toISOString().substring(0, 10) : '';
      const date_fin = projet.date_fin ? new Date(projet.date_fin).toISOString().substring(0, 10) : '';
      
      this.projetForm.patchValue({
        nom: projet.nom,
        budget: projet.budget,
        date_debut: date_debut,
        date_fin: date_fin,
        statut: projet.statut,
        description: projet.description
      });
    },
    (error: HttpErrorResponse) => {
      console.error('Erreur lors de la récupération du projet:', error.message);
    }
  );
}



onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    console.log('Fichier sélectionné :', file.name);
    this.imageFile = file;
  }
}


onSubmit(): void {
  if (this.projetForm.valid) {
    // Préparer les données du formulaire en tant qu'objet JSON
    const projetData = { ...this.projetForm.value };
    
    // Ajouter l'ID du projet
    if (this.projetId) {
      projetData.id = this.projetId;
    }

    // Effectuer la mise à jour des données du projet
    this.projetsService.updateProjet(projetData).subscribe({
      next: (response) => {
        console.log('Projet mis à jour avec succès:', response);
        Swal.fire({
          icon: 'success',
          title: 'Projet mis à jour',
          text: 'Le projet a été mis à jour avec succès!',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.router.navigate(['/sidebar1/projet']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du projet:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la mise à jour du projet.',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }
}

}