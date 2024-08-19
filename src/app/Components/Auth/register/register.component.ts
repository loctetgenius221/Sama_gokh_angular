import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { CommunesService } from '../../../Services/communes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  municipalites: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private communesService: CommunesService // Injection du service
  ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      sexe: ['', Validators.required],
      date_naiss: ['', Validators.required],
      photo: [''],
      profession: ['', Validators.required],
      numero_identite: ['', Validators.required],
      image_cni: ['', Validators.required],
      municipalite_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Récupérer les municipalités lors de l'initialisation du composant
    this.communesService.getAllCommunes().subscribe({
      next: (data) => {
        this.municipalites = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des municipalités', error);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({
        image_cni: file
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      
      // Ajouter tous les champs du formulaire au FormData
      Object.keys(this.registerForm.controls).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });
  
      this.authService.register(formData).subscribe({
        next: (response) => {
          // Gérer la réponse de l'inscription
          console.log('Inscription réussie', response);
          // Par exemple, rediriger l'utilisateur vers la page de connexion
          // ou afficher un message de succès.
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          // this.router.navigate(['/login']); // Si vous utilisez un routeur
        },
        error: (error) => {
          // Gérer l'erreur
          console.error('Erreur lors de l\'inscription', error);
          // Afficher un message d'erreur à l'utilisateur
          alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        }
      });
    } else {
      // Si le formulaire n'est pas valide, afficher un message d'erreur
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
  
}
