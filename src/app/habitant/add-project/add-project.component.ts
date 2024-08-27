import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjetsService } from '../../Services/projets.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projetForm: FormGroup;
  isEditMode: boolean = false;
  projectId: number | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private projetsService: ProjetsService,
    private route: ActivatedRoute
  ) {
    this.projetForm = this.formBuilder.group({
      id: [null], // Champ pour l'identifiant du projet en mode modification
      nom: ['', Validators.required],
      budget: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      statut: ['en-attente', Validators.required],
      photo: [null],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      console.log('Project ID from route:', this.projectId);
      if (this.projectId) {
        this.isEditMode = true;
        this.loadProject();
      }
    });
  }

  loadProject(): void {
    if (this.projectId) {
      this.projetsService.getProjetById(this.projectId).subscribe({
        next: (project) => {
          this.projetForm.patchValue(project);
        },
        error: (error) => {
          console.error('Erreur lors du chargement du projet:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors du chargement du projet.',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.projetForm.valid) {
      const projetData = this.projetForm.value;
      if (this.isEditMode && this.projectId) {
        projetData.id = this.projectId; // Assurez-vous que l'ID est inclus
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
              this.router.navigate(['/home']);
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
      } else {
        this.projetsService.addProjet(projetData).subscribe({
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
      }
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
