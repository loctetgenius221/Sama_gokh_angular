import { Component, OnInit } from '@angular/core';
import { HabitantsService } from '../../../Services/habitants.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  habitants: any[] = [];

  constructor(private habitantsService: HabitantsService) {}

  ngOnInit(): void {
    this.loadHabitants();
  }

  loadHabitants(): void {
    this.habitantsService.getAllhabitants().subscribe(
      (response) => {
        console.log('Habitants Data:', response);
        this.habitants = response.data; // Stocke les habitants récupérés
      },
      (error) => {
        console.error('Erreur lors du chargement des habitants:', error);
      }
    );
  }
}
