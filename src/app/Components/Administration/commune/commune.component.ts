import { Component, OnInit } from '@angular/core';
import { CommunesService } from '../../../Services/communes.service'; // Assurez-vous que le chemin est correct
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

  constructor(private communesService: CommunesService) {}

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
}
