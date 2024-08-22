import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router
import { CommunesService } from '../../../Services/communes.service'; // Assurez-vous du bon chemin
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commune',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {
  communes: any[] = [];
  totalCommunes: number = 0;

  constructor(private communesService: CommunesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCommunes();
  }

  loadCommunes(): void {
    this.communesService.getAllCommunes().subscribe(
      (data) => {
        this.communes = data;
        this.totalCommunes = data.length;
      },
      (error) => {
        console.error('Erreur lors du chargement des communes:', error);
      }
    );
  }

  deleteCommune(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commune ?')) {
      this.communesService.deleteCommune(id).subscribe(
        () => {
          this.communes = this.communes.filter(commune => commune.id !== id);
          this.totalCommunes = this.communes.length;
          alert('Commune supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la commune:', error);
          alert('Erreur lors de la suppression de la commune');
        }
      );
    }
  }

  navigateToAddCommune(): void {
    this.router.navigate(['/sidebar/commune/add']);
  }
  showHabitants(communeId: number): void {
    this.router.navigate(['/sidebar/utilisateurs', communeId]);
  }
}
