import { Component, OnInit } from '@angular/core';
import { HabitantsService } from '../../../Services/habitants.service';
import { CommunesService } from '../../../Services/communes.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  communes: any[] = [];
  habitants: any[] = [];
  totalCommunes: number = 0;
  totalHabitants: number = 0;
  regions: string[] = []; 

  constructor(
    private habitantsService: HabitantsService,
    private communesService: CommunesService
  ) {}

  ngOnInit(): void {
    this.loadCommunes();
    this.loadHabitants();
  }

  loadCommunes(): void {
    this.communesService.getAllCommunes().subscribe(
      (data) => {
        console.log('Communes Data:', data);
        this.communes = data;
        this.totalCommunes = data.length;

        // Extraire les noms uniques des régions
        const regionSet = new Set<string>();
        data.forEach(commune => {
          regionSet.add(commune.region);  // Ajoutez chaque région au Set pour garantir l'unicité
        });

        // Convertir le Set en tableau
        this.regions = Array.from(regionSet);
        console.log('Regions:', this.regions);
      },
      (error) => {
        console.error('Erreur lors du chargement des communes:', error);
      }
    );
  }

  loadHabitants(): void {
    this.habitantsService.getAllhabitants().subscribe(
      (response) => {
        console.log('Habitants Data:', response);
        this.habitants = response.data; // Accès à la propriété 'data' de l'objet réponse
        this.totalHabitants = this.habitants.length; // Compte des habitants dans 'data'
      },
      (error) => {
        console.error('Erreur lors du chargement des habitants:', error);
      }
    );
  }
}
