import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ProjetsService } from "../../Services/projets.service";
import { AuthService } from '../../Services/auth/auth.service'; // Importer AuthService
import localeFR from '@angular/common/locales/fr';
import Swal from 'sweetalert2';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: any; // Utilisation de any pour project
  baseUrl: string = 'http://127.0.0.1:8000/storage/photos/'; // Base URL pour les photos
  currentUserId: number | undefined; // ID de l'utilisateur connecté

  constructor(
    private projetsService: ProjetsService,
    private authService: AuthService, // Injecter AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        this.currentUserId = userDetails.data.id;
        this.loadProject();
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      }
    );
  }

  loadProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projetsService.getProjetById(+id).subscribe(
        (data: any) => { // Utilisation de any pour data
          this.project = {
            ...data,
            photo: data.photo ? this.baseUrl + data.photo : 'https://via.placeholder.com/300x200'
          };
        },
        (error) => {
          console.error('Erreur lors de la récupération du projet:', error);
        }
      );
    }
  }

  supprimerProjet(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projetsService.deleteProjet(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'Le projet a été supprimé avec succès.',
              showConfirmButton: false,
              timer: 2000 // L'alerte disparaît après 2 secondes
            });
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          },
          error: (error: any) => {
            console.error('Erreur lors de la suppression du projet:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression du projet.',
              showConfirmButton: false,
              timer: 3000 // L'alerte disparaît après 3 secondes
            });
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']); // Remplacez '/' par la route souhaitée si nécessaire
  }

  // Vérifie si l'utilisateur connecté est le créateur du projet
  isCurrentUser(): boolean {
    return this.project && this.currentUserId === this.project.creator_id;
  }
}
