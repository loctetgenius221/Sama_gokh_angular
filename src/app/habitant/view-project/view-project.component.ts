import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ProjetsService } from "../../Services/projets.service";
import { AuthService } from '../../Services/auth/auth.service'; 
import { CommentairesService } from '../../Services/commentaires.service'; // Importer CommentairesService
import localeFR from '@angular/common/locales/fr';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink,FormsModule],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: any;
  baseUrl: string = 'http://127.0.0.1:8000/storage/photos/';
  currentUserId: number | undefined;
  commentaire: string = ''; // Propriété pour stocker le commentaire
  commentaires: any[] = []; // Propriété pour stocker les commentaires

  constructor(
    private projetsService: ProjetsService,
    private authService: AuthService,
    private commentairesService: CommentairesService, // Injecter CommentairesService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        console.log('Détails de l\'utilisateur:', userDetails); // Vérifiez que les détails de l'utilisateur sont bien reçus
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
        (data: any) => {
          this.project = {
            ...data,
            photo: data.photo ? this.baseUrl + data.photo : 'https://via.placeholder.com/300x200'
          };
          console.log('Project:', this.project);
          console.log('Current User ID:', this.currentUserId);
          this.loadCommentaires();
        },
        (error) => {
          console.error('Erreur lors de la récupération du projet:', error);
        }
      );
    }
  }

  isCurrentUser(): boolean {
    return this.project && this.currentUserId === this.project.user_id;
  }

  ajouterCommentaire(): void {
    if (this.commentaire.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Erreur',
        text: 'Le commentaire ne peut pas être vide.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('projet_id', this.project.id);
    formData.append('contenu', this.commentaire);

    this.commentairesService.addCommentaire(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Commentaire ajouté avec succès.',
        });
        this.commentaire = ''; // Réinitialiser le champ de commentaire
        this.loadCommentaires(); // Recharger les commentaires après ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout du commentaire.',
        });
      }
    });
  }
  loadCommentaires(): void {
    if (this.project && this.project.id) {
      this.commentairesService.getAllCommentaires().subscribe(
        (response: any) => {
          console.log('Données reçues:', response);
          const commentairesPourProjet = response.data[this.project.id] || [];
          this.commentaires = commentairesPourProjet;

          this.commentaires.forEach(commentaire => {
            console.log('Current User ID:', this.currentUserId);
            console.log('ID Utilisateur Auteur du Commentaire:', commentaire.habitant.user_id); // Assurez-vous que cet ID correspond à l'utilisateur lié à l'habitant
          });
          
          console.log('Commentaires filtrés:', this.commentaires); // Vérifiez que `habitant.id` est correct
        },
        (error) => {
          console.error('Erreur lors de la récupération des commentaires:', error);
        }
      );
    }
  }
  
  
  getImageUrl(photo: string): string {
    return photo ? `http://127.0.0.1:8000/storage/photos/${photo}` : 'https://via.placeholder.com/50';
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
              timer: 2000
            });
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du projet:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression du projet.',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  supprimerCommentaire(commentaireId: number): void {
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
        this.commentairesService.deleteCommentaire(commentaireId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimé!',
              text: 'Le commentaire a été supprimé avec succès.',
              showConfirmButton: false,
              timer: 2000
            });
            this.loadCommentaires(); // Recharger les commentaires après suppression
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du commentaire:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression du commentaire.',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    });
  }
  
}
