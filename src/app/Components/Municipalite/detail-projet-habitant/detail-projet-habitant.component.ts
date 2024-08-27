import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import { ProjetsService } from '../../../Services/projets.service'; 
import { Location } from '@angular/common';

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
  
}

