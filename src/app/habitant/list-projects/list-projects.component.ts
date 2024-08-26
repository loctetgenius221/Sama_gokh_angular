import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../project.service';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {
  projects: any[] = [];
  loading: boolean = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
        this.loading = false;
      }
    );
  }
}
