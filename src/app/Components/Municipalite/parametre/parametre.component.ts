import { Component, OnInit } from '@angular/core';
import { CommunesService } from '../../../Services/communes.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  municipalite: any = {};
  password: string = '';

  constructor(private communesService: CommunesService, private router: Router) {}

  ngOnInit(): void {
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.municipalite = data;
        console.log('Données de la municipalité:', this.municipalite); // Vérifiez ici si l'ID est bien défini
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de la municipalité:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.municipalite.id) {
      console.error('ID de la municipalité manquant');
      return; // Ne pas continuer si l'ID est manquant
    }

    const updatedMunicipalite = {
      ...this.municipalite,
      password: this.password // Si un mot de passe doit être mis à jour
    };

    this.communesService.updateCommune(this.municipalite.id, updatedMunicipalite).subscribe(
      (response) => {
        console.log('Mise à jour réussie:', response);

        // Afficher une alerte de succès avec SweetAlert et un timer
        Swal.fire({
          title: 'Succès',
          text: 'Les informations de la municipalité ont été mises à jour avec succès.',
          icon: 'success',
          timer: 3000, // Affiche l'alerte pendant 3 secondes
          timerProgressBar: true,
          didClose: () => {
            // Redirection vers la page du tableau de bord après la fermeture automatique de l'alerte
            this.router.navigate(['/sidebar1/dashboard']);
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la municipalité:', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de la mise à jour. Veuillez réessayer plus tard.',
          icon: 'error',
          timer: 3000, // Affiche l'alerte pendant 3 secondes
          timerProgressBar: true
        });
      }
    );
  }
}
