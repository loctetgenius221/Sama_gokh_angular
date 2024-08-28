import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ProjetsService } from "../../Services/projets.service";
import { AuthService } from '../../Services/auth/auth.service'; 
import { CommentairesService } from '../../Services/commentaires.service';
import localeFR from '@angular/common/locales/fr';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { VotesService } from '../../Services/votes.service';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: any;
  baseUrl: string = 'http://127.0.0.1:8000/storage/photos/';
  currentUserId: number | undefined;
  commentaire: string = '';
  commentaires: any[] = [];
  votesPour: number = 0;
  voted: boolean = false;

  constructor(
    private projetsService: ProjetsService,
    private authService: AuthService,
    private commentairesService: CommentairesService, 
    private route: ActivatedRoute,
    private router: Router,
    private votesService: VotesService,
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      (userDetails) => {
        console.log('Détails de l\'utilisateur:', userDetails);
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
          this.loadVotesPour(this.project.id);
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
        showConfirmButton: false,
        timer: 3000
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
          showConfirmButton: false,
          timer: 3000
        });
        this.commentaire = '';
        this.loadCommentaires();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout du commentaire.',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  loadCommentaires(): void {
    if (this.project && this.project.id) {
      this.commentairesService.getAllCommentaires().subscribe(
        (response: any) => {
          console.log('Données reçues:', response);
  
          // Vérifiez la structure des données reçues
          const commentairesPourProjet = response.data[this.project.id] || [];
  
          // Assurez-vous que les commentaires contiennent les informations de photo
          this.commentaires = commentairesPourProjet.map((commentaire: any) => ({
            ...commentaire,
            habitant: {
              ...commentaire.habitant,
              photo: commentaire.habitant.photo 
                ? `http://127.0.0.1:8000/storage/${commentaire.habitant.photo}` 
                : 'https://via.placeholder.com/50' // Valeur par défaut si pas de photo// Valeur par défaut si pas de photo
            }
          }));
        },
        (error) => {
          console.error('Erreur lors de la récupération des commentaires:', error);
        }
      );
    }
  }
  
  

  loadVotesPour(projectId: number): void {
    this.votesService.getAllVotes().subscribe(
      (response: any) => {
        console.log('Réponse de getAllVotes:', response);
        const votesParProjet = response.data || [];
        const projetVotes = votesParProjet.find((vote: any) => vote.projet_id === projectId);
        console.log('Votes pour le projet:', projetVotes);
        this.votesPour = projetVotes ? projetVotes.total_votes : 0;
  
        if (this.currentUserId !== undefined) {
          this.votesService.getUserVote(projectId, this.currentUserId).subscribe(
            (userVoteResponse: any) => {
              console.log('Réponse de getUserVote:', userVoteResponse);
              this.voted = userVoteResponse.data ? true : false;
            },
            (error) => {
              console.error('Erreur lors de la récupération du vote de l\'utilisateur:', error);
            }
          );
        } else {
          console.error('ID utilisateur non défini');
        }
  
        console.log('Nombre de votes pour:', this.votesPour);
      },
      (error) => {
        console.error('Erreur lors de la récupération des votes pour:', error);
      }
    );
  }
  
  onVotePour(): void {
    if (!this.currentUserId || !this.project?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de voter. Veuillez réessayer.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    if (this.voted) {
      Swal.fire({
        icon: 'info',
        title: 'Information',
        text: 'Vous avez déjà voté pour ce projet.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    const vote = {
      projet_id: this.project.id,
      statut: 'pour'
    };
  
    this.votesService.addVote(vote).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message || 'Vote ajouté avec succès.',
          showConfirmButton: false,
          timer: 3000
        });
        this.voted = true;
        this.loadVotesPour(this.project.id);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du vote:', error);
        const errorMessage = error?.error?.message || 'Vous avez déjà voté.';
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
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
            this.loadCommentaires();
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
