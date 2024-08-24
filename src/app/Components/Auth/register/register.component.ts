import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { CommunesService } from '../../../Services/communes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  currentStep: number = 1;
  municipalites: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private communesService: CommunesService,
    private router: Router
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

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({
        photo: file
      });
    }
  }
  
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      
      Object.keys(this.registerForm.controls).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });
  
      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          Swal.fire({
            title: 'Inscription réussie !',
            text: 'Vous pouvez maintenant vous connecter.',
            icon: 'success',
            timer: 3000, // L'alerte se fermera automatiquement après 3 secondes
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
            icon: 'error',
            timer: 3000, // L'alerte se fermera automatiquement après 3 secondes
            showConfirmButton: false
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs obligatoires.',
        icon: 'warning',
        timer: 3000, // L'alerte se fermera automatiquement après 3 secondes
        showConfirmButton: false
      });
    }
  }
  
}
