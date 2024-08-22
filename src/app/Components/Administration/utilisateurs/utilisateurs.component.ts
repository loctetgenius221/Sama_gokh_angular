import { Component, OnInit } from '@angular/core';
import { HabitantsService } from '../../../Services/habitants.service';
import { CommunesService } from '../../../Services/communes.service'; // Importez le service des communes
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  habitants: any[] = [];
  communeId: number = 0; // Initialisation avec une valeur par défaut
  communeName: string = '';

  constructor(
    private habitantsService: HabitantsService,
    private communesService: CommunesService, // Ajoutez le service des communes
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la commune à partir des paramètres de la route
    this.communeId = +this.route.snapshot.params['communeId']; // Ajout d'un + pour convertir en number
    this.loadHabitants();
    this.loadCommuneName();
  }

  loadHabitants(): void {
    this.habitantsService.getHabitantsByCommune(this.communeId).subscribe(
      (response) => {
        console.log('Habitants Data:', response);
        this.habitants = response.data; // Stocke les habitants récupérés
      },
      (error) => {
        console.error('Erreur lors du chargement des habitants:', error);
      }
    );
  }

  loadCommuneName(): void {
    this.communesService.getCommuneById(this.communeId).subscribe(
      (response) => {
        console.log('Commune Data:', response);
        this.communeName = response.nom_commune; // Ajustez la clé pour correspondre à votre réponse API
      },
      (error) => {
        console.error('Erreur lors du chargement du nom de la commune:', error);
      }
    );
  }
  

  // Méthode pour revenir en arrière
  retour(): void {
    this.router.navigate(['/sidebar/communes']); // Remplace '/communes' par la route de retour souhaitée
  }
}
