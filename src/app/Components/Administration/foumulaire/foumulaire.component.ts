import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommunesService } from '../../../Services/communes.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-foumulaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SidebarComponent],
  templateUrl: './foumulaire.component.html',
  styleUrls: ['./foumulaire.component.css']
})
export class FoumulaireComponent implements OnInit {
  communeForm: FormGroup;
  isEditMode = false;
  communeId: number | null = null;

  constructor(
    private communesService: CommunesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.communeForm = this.fb.group({
      nom_commune: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      departement: ['', Validators.required],
      region: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.communeId = +params['id'];
        this.loadCommune(this.communeId);

        // Rendre le champ 'password' optionnel en mode édition
        this.communeForm.get('password')?.clearValidators();
        this.communeForm.get('password')?.updateValueAndValidity();
      }
    });
  }

  loadCommune(id: number): void {
    this.communesService.getCommuneById(id).subscribe(commune => {
      this.communeForm.patchValue({
        nom_commune: commune.nom_commune,
        email: commune.email,
        password: '', // Réinitialiser le mot de passe pour éviter d'afficher des informations sensibles
        departement: commune.departement,
        region: commune.region
      });

      // Recharger les validations pour garantir le fonctionnement correct du formulaire
      this.communeForm.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.communeForm.valid) {
      const communeData = { ...this.communeForm.value };
      // Exclure le mot de passe s'il est vide
      if (!communeData.password) {
        delete communeData.password;
      }

      if (this.isEditMode && this.communeId !== null) {
        this.communesService.updateCommune(this.communeId, communeData).subscribe(
          response => {
            console.log('Commune modifiée avec succès:', response);
            this.router.navigate(['/sidebar/communes']);
          },
          error => {
            console.error('Erreur lors de la modification de la commune:', error);
          }
        );
      } else {
        this.communesService.addCommune(communeData).subscribe(
          response => {
            console.log('Commune ajoutée avec succès:', response);
            this.communeForm.reset();
          },
          error => {
            console.error('Erreur lors de l\'ajout de la commune:', error);
          }
        );
      }
    } else {
      console.log('Formulaire invalide:', this.communeForm.errors);
    }
  }

  goBack(): void {
    this.router.navigate(['/sidebar/communes']);
  }
}
