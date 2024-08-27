import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HabitantsService } from '../../../Services/habitants.service';
import { ProjetsService } from '../../../Services/projets.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
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
    this.loadProjetsByHabitant(this.habitantId); // Passage de habitantId en argument
  }

  getHabitantDetails() {
    this.habitantsService.getHabitantById(this.habitantId).subscribe(
      (response: any) => { 
        if (response.status) {
          this.habitant = response.data;
          this.habitant.age = this.calculateAge(this.habitant.date_naiss);
          const photoUrl = this.habitant.photo 
            ? `http://127.0.0.1:8000/storage/${this.habitant.photo}` 
            : 'https://via.placeholder.com/300x200';
          console.log('URL de la photo:', photoUrl);
          this.habitant.photo = photoUrl;
        } else {
          console.error('Erreur: ', response.message);
        }
      },
      (error: HttpErrorResponse) => { // Ajout du type HttpErrorResponse ici
        console.error('Erreur de serveur: ', error);
      }
    );
  }
  
  loadProjetsByHabitant(habitantId: number): void {
    this.projetsService.getProjetsByHabitant(habitantId).subscribe(
      (response: { data: any[] }) => {
        this.projets = response.data;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
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
    this.router.navigate(['/sidebar1/habitant/detail/projet', projetId]);
  }
}
