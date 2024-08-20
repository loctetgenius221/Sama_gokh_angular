import { Component, OnInit } from '@angular/core';
import { CommunesService } from '../../../Services/communes.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commune',
  standalone: true,
  imports: [CommonModule],
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
}
