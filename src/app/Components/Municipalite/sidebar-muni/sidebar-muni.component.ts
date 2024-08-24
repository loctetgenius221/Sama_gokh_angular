import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommunesService } from '../../../Services/communes.service';

@Component({
  selector: 'app-sidebar-muni',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-muni.component.html',
  styleUrl: './sidebar-muni.component.css'
})
export class SidebarMuniComponent implements OnInit {
  nomCommune: string | undefined; // Variable pour stocker le nom de la commune

  constructor(private communesService: CommunesService) {}

  ngOnInit(): void {
    // Appel au service pour récupérer les informations de la municipalité connectée
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.nomCommune = data.nom_commune; // Assigner le nom de la commune à la variable
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité', error);
      }
    );
  }
}
