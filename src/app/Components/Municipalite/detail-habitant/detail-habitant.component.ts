import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HabitantsService } from '../../../Services/habitants.service';
import { ProjetsService } from '../../../Services/projets.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule,RouterLink],
  templateUrl: './detail-habitant.component.html',
  styleUrls: ['./detail-habitant.component.css']
})
export class DetailHabitantComponent implements OnInit {
  habitant: any = {}; // Stocke les détails de l'habitant
  projets: any[] = []; // Stocke les projets proposés par l'habitant
  habitantId: number = 0; // ID de l'habitant récupéré depuis l'URL

  constructor(
    private route: ActivatedRoute,
    private habitantsService: HabitantsService,
    private projetsService: ProjetsService,
    private router: Router
  ) { }

 
  ngOnInit(): void {
    this.habitantId = +this.route.snapshot.paramMap.get('id')!;
    this.getHabitantDetails();
  }

  getHabitantDetails() {
    this.habitantsService.getHabitantById(this.habitantId).subscribe(
      response => {
        if (response.status) {
          this.habitant = response.data;
          this.habitant.age = this.calculateAge(this.habitant.date_naiss);
        } else {
          console.error('Erreur: ', response.message);
        }
      },
      error => {
        console.error('Erreur de serveur: ', error);
      }
    );
  }
  
  calculateAge(dateNaiss: string): number {
    const today = new Date();
    const birthDate = new Date(dateNaiss);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  

  voirDetails(projetId: number): void {
    this.router.navigate(['/habitant/detail/projet', projetId]);
  }
}
