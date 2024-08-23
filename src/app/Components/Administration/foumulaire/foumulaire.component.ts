import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommunesService } from '../../../Services/communes.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';

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

  // Liste des régions
  regions: string[] = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 
    'Louga', 'Fatick', 'Matam', 'Tambacounda', 'Kolda', 
    'Kédougou', 'Sédhiou','Diourbel','Kaffrine'
  ];

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
        password: '',
        departement: commune.departement,
        region: commune.region
      });
      this.communeForm.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.communeForm.valid) {
      const communeData = { ...this.communeForm.value };
      if (!communeData.password) {
        delete communeData.password;
      }

      if (this.isEditMode && this.communeId !== null) {
        this.communesService.updateCommune(this.communeId, communeData).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Commune modifiée avec succès!',
              timer: 1000, // Alerte disparaît après 1 seconde
              timerProgressBar: true
            }).then(() => this.router.navigate(['/sidebar/communes']));
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur lors de la modification de la commune',
              timer: 1000, // Alerte disparaît après 1 seconde
              timerProgressBar: true
            });
          }
        );
      } else {
        this.communesService.addCommune(communeData).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Commune ajoutée avec succès!',
              timer: 1000, // Alerte disparaît après 1 seconde
              timerProgressBar: true
            }).then(() =>  this.router.navigate(['/sidebar/communes']));
              // this.communeForm.reset());
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur lors de l\'ajout de la commune',
              timer: 1000, // Alerte disparaît après 1 seconde
              timerProgressBar: true
            });
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Formulaire invalide',
        timer: 1000, // Alerte disparaît après 1 seconde
        timerProgressBar: true
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/sidebar/communes']);
  }
}
