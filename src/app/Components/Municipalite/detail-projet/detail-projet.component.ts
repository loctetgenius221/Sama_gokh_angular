import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { CommentairesService } from '../../../Services/commentaires.service';
import localeFR from '@angular/common/locales/fr';
import { VotesService } from '../../../Services/votes.service';

registerLocaleData(localeFR, 'fr');

@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  projet: any = {};  // Pour stocker les détails du projet
  commentaires: any[] = [];  // Pour stocker les commentaires du projet
  votesPour: number = 0;

  constructor(
    private projetsService: ProjetsService,
    private route: ActivatedRoute,
    private commentairesService: CommentairesService,
    private votesService: VotesService
  ) {}

  ngOnInit(): void {
    const projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (projetId) {
      this.getProjet(projetId);
      this.getCommentaires(projetId); 
      this.loadVotesPour(projetId);
    }
  }

  getProjet(projetId: number): void {
    this.projetsService.getProjetById(projetId).subscribe(
      (data) => {
        this.projet = {
          ...data,
          date_debut: this.formatDate(data.date_debut),
          date_fin: this.formatDate(data.date_fin),
          photo: data.photo ? `http://127.0.0.1:8000/storage/photos/${data.photo}` : null
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    );
  }
  
  getCommentaires(projetId: number): void {
    this.commentairesService.getAllCommentaires().subscribe(
      (response: any) => {
        const commentairesPourProjet = response.data[projetId] || [];
        this.commentaires = commentairesPourProjet;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return dateString;
  }

  loadVotesPour(projetId: number): void {
    this.votesService.getAllVotes().subscribe(
      (response: any) => {
        const votesParProjet = response.data || [];
        const projetVotes = votesParProjet.find((vote: any) => vote.projet_id === projetId);
        this.votesPour = projetVotes ? projetVotes.total_votes : 0;
      },
      (error) => {
        console.error('Erreur lors de la récupération des votes pour:', error);
      }
    );
  }
}
