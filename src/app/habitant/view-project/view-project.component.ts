import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
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
  votesContre: number = 0;
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
          this.loadVotesPour(this.project.id);
          this.loadVotesContre(this.project.id); 
          this.loadCommentaires();
          this.checkIfUserVoted(this.project.id);
        },
        (error) => {
          console.error('Erreur lors de la récupération du projet:', error);
        }
      );
    }
  }

  checkIfUserVoted(projectId: number): void {
    if (this.currentUserId) {
      this.votesService.getUserVote(projectId, this.currentUserId).subscribe(
        (response: any) => {
          if (response.data) {
            this.voted = true;
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification du vote de l\'utilisateur:', error);
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
          const commentairesPourProjet = response.data[this.project.id] || [];
  
          this.commentaires = commentairesPourProjet.map((commentaire: any) => ({
            ...commentaire,
            habitant: {
              ...commentaire.habitant,
              photo: commentaire.habitant.photo 
                ? `http://127.0.0.1:8000/storage/${commentaire.habitant.photo}` 
                : 'https://via.placeholder.com/50'
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
        const votesParProjet = response.data || [];
        const projetVotes = votesParProjet.find((vote: any) => vote.projet_id === projectId);
        this.votesPour = projetVotes ? projetVotes.total_votes : 0;
      },
      (error) => {
        console.error('Erreur lors de la récupération des votes pour:', error);
      }
    );
  }

  loadVotesContre(projectId: number): void {
    this.votesService.getVotesContre().subscribe(
      (response: any) => {
        const votesParProjet = response.data || [];
        const projetVotes = votesParProjet.find((vote: any) => vote.projet_id === projectId);
        this.votesContre = projetVotes ? projetVotes.total_votes : 0;
      },
      (error) => {
        console.error('Erreur lors de la récupération des votes contre:', error);
      }
    );
  }

  handleVote(statut: 'pour' | 'contre'): void {
    if (this.voted) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous avez déjà voté pour ce projet.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const formData = new FormData();
    formData.append('projet_id', this.project.id);
    formData.append('statut', statut);

    this.votesService.addVote(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Votre vote a été enregistré.',
          showConfirmButton: false,
          timer: 3000
        });
        this.voted = true;
        if (statut === 'pour') {
          this.votesPour++;
        } else if (statut === 'contre') {
          this.votesContre++;
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du vote:', error);
      }
    );
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
}
