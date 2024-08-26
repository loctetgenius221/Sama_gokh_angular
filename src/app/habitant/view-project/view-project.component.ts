import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../project.service';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  project: any;
  projectId!: number;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(+projectId).subscribe(
        (data) => {
          if (data) {
            this.project = data;
          } else {
            console.warn('Aucun projet trouvé pour cet ID.');
          }
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors du chargement des détails du projet:', error);
          this.loading = false;
        }
      );
    } else {
      // Si aucun ID n'est fourni, utiliser des données mock
      this.project = {
        nom: 'Exemple de Projet',
        description: 'Description détaillée du projet.',
        statut: 'En cours',
        date_debut: new Date(),
        date_fin: new Date(),
        budget: 10000,
        etat: 'Actif'
      };
      this.loading = false;
    }
  }

  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe(
      data => {
        this.project = data;
      },
      error => {
        console.error('Erreur lors du chargement du projet', error);
      }
    );
  }
}
