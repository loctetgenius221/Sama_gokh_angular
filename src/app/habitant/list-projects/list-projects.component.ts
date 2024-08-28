import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ProjetsService } from "../../Services/projets.service";

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {
  projets: any[] = [];
  loading: boolean = true;

  constructor( private projetsService: ProjetsService,) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projetsService.getAllProjets().subscribe(
      (response: { data: any[] }) => {
        this.projets = response.data; // Extraire le tableau de projets
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
        this.loading = false;
      }
    );
  }
  
}
