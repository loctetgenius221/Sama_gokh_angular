import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommunesService } from '../../../Services/communes.service';

@Component({
  selector: 'app-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './habitant.component.html',
  styleUrls: ['./habitant.component.css']
})
export class HabitantComponent implements OnInit {
  habitants: any[] = []; // Utilisez 'any' ici
  errorMessage: string | null = null;

  constructor(private communesService: CommunesService, private router: Router) {}

  ngOnInit(): void {
    this.getHabitants();
  }

  getHabitants(): void {
    this.communesService.getHabitantsConnecte().subscribe(
      (data) => {
        this.habitants = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des habitants';
        console.error(error);
      }
    );
  }

  voirDetails(id: number): void {
    this.router.navigate(['/sidebar1/habitant/detail/habitant', id]);
  }
}
