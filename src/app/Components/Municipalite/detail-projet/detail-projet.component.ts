import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service';
import { ActivatedRoute } from '@angular/router';
import { CommentairesService } from '../../../Services/commentaires.service';
import localeFR from '@angular/common/locales/fr';

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

  constructor(
    private projetsService: ProjetsService,
    private route: ActivatedRoute,
    private commentairesService: CommentairesService // Injecter le service des commentaires ici
  ) {}

  ngOnInit(): void {
    const projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (projetId) {
      this.getProjet(projetId);
      this.getCommentaires(projetId); // Récupérer les commentaires associés au projet
    }
  }

  getProjet(projetId: number): void {
    this.projetsService.getProjetById(projetId).subscribe(
      (data) => {
        this.projet = {
          ...data,
          date_debut: this.formatDate(data.date_debut),
          date_fin: this.formatDate(data.date_fin)
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
        console.log('Données reçues:', response); // Vérifiez la structure des données dans la console
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
}
