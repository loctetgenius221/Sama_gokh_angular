import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjetsService } from '../../Services/projets.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  projetForm: FormGroup;
  projectId: number | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private projetsService: ProjetsService,
    private route: ActivatedRoute
  ) {
    this.projetForm = this.formBuilder.group({
      nom: ['', Validators.required],
      budget: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      statut: ['en-attente', Validators.required],
      photo: [null],
      description: ['', Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.projectId = +params['id'];
        if (this.projectId) {
            this.loadProject();
        } else {
            console.error('ID du projet manquant');
        }
    });
}


  loadProject(): void {
    if (this.projectId) {
      this.projetsService.getProjetById(this.projectId).subscribe({
        next: (project) => {
          console.log('Données du projet chargées:', project);
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
    if (this.projetForm.valid && this.projectId) {
      const projetData = this.projetForm.value;
      const formData = new FormData();
      Object.keys(projetData).forEach(key => {
        formData.append(key, projetData[key]);
      });
      formData.append('id', this.projectId.toString()); // Assurez-vous que 'id' est bien ajouté
  
      this.projetsService.updateProjet(formData).subscribe({
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
      console.warn('Le formulaire n\'est pas valide ou ID manquant:', this.projetForm.errors);
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
