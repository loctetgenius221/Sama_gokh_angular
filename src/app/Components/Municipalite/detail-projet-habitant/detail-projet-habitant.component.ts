import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { ProjetsService } from '../../../Services/projets.service'; 
import { Location } from '@angular/common';
import Swal from 'sweetalert2'; // Importer SweetAlert2

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-detail-projet-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detail-projet-habitant.component.html',
  styleUrls: ['./detail-projet-habitant.component.css']
})
export class DetailProjetHabitantComponent implements OnInit {
  projetId!: string;
  project: any; // Utilisez ce nom pour correspondre avec le template
  isApproved: boolean = false; // Ajouter une propriété pour gérer l'état d'approbation

  constructor(
    private route: ActivatedRoute,
    private projetsService: ProjetsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.projetId = this.route.snapshot.paramMap.get('id')!;
    this.loadDetails();
  }

  loadDetails(): void {
    this.projetsService.getProjetById(+this.projetId).subscribe(
      (data: any) => {
        this.project = {
          ...data,
          photo: data.photo ? 'http://127.0.0.1:8000/storage/photos/' + data.photo : 'https://via.placeholder.com/300x200'
        };
        this.isApproved = this.project.etat.trim().toLowerCase() === 'approuvé'; // Vérifiez si le projet est déjà approuvé
        console.log('Détails du projet:', this.project);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du projet:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  approveProject(): void {
    if (this.project) {
      const nouvelEtat = 'approuvé'; // Définissez l'état à mettre à jour
      
      this.projetsService.updateEtatProjet(+this.projetId, nouvelEtat).subscribe(
        response => {
          console.log('État du projet mis à jour avec succès:', response);
          // Mettez à jour le statut du projet et la propriété isApproved
          this.project.etat = nouvelEtat;
          this.isApproved = true; // Met à jour l'état d'approbation
          
          // Afficher SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Projet Approuvé',
            text: 'L\'état du projet a été mis à jour avec succès.',
            timer: 3000, // Afficher l'alerte pendant 3 secondes
            showConfirmButton: false
          });
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'état du projet:', error);
          if (error.status === 500) {
            console.error('Erreur côté serveur:', error.error); // Affichez plus de détails de l'erreur côté serveur
          } else {
            console.error('Erreur:', error.message); // Affichez le message d'erreur
          }
        }
      );
    }
  }
}
