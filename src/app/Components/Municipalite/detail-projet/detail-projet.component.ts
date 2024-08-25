import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule,registerLocaleData } from '@angular/common';
import { ProjetsService } from '../../../Services/projets.service';
import { ActivatedRoute } from '@angular/router';
import localeFR from '@angular/common/locales/fr';

registerLocaleData(localeFR, 'fr');
@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail-projet.component.html',
  styleUrl: './detail-projet.component.css'
})
export class DetailProjetComponent implements OnInit {
  projet: any = {};  // Pour stocker les détails du projet

  constructor(
    private projetsService: ProjetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (projetId) {
      this.projetsService.getProjetById(projetId).subscribe(
        (data) => {
          // Vérification et formatage des dates si nécessaire
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
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // Si la date est valide, la formater au format dd/MM/yyyy
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return dateString; // Retourner la chaîne d'origine si la date n'est pas valide
  }
}