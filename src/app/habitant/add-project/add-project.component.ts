import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjetsService } from '../../Services/projets.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  projetForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private projetsService: ProjetsService
  ) {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      budget: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      statut: ['en-attente', Validators.required],
      photo: [null],
      description: ['', Validators.required],
      etat: ['rejeté'] 
    });
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const projetData = this.projetForm.value;
      const formData = new FormData();
      Object.keys(projetData).forEach(key => {
        formData.append(key, projetData[key]);
      });

      console.log('Données du projet à envoyer:', projetData);

      this.projetsService.addProjet(formData).subscribe({
        next: (response) => {
          console.log('Projet ajouté avec succès:', response);
          Swal.fire({
            icon: 'success',
            title: 'Projet ajouté',
            text: 'Le projet a été ajouté avec succès!',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du projet:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout du projet.',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    } else {
      console.warn('Le formulaire n\'est pas valide:', this.projetForm.errors);
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('Fichier sélectionné:', file);
      this.projetForm.patchValue({
        photo: file
      });
    }
  }
}
