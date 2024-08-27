import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ParametreComponent } from '../parametre/parametre.component';
import { CommunesService } from '../../../Services/communes.service';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-sidebar-muni',
  standalone: true,
  imports: [ParametreComponent,RouterModule],
  templateUrl: './sidebar-muni.component.html',
  styleUrls: ['./sidebar-muni.component.css']
})
export class SidebarMuniComponent implements OnInit {
  nomCommune: string | undefined;

  constructor(private communesService: CommunesService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.nomCommune = data.nom_commune;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité', error);
      }
    );
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(
      () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }

  openParametreModal() {
    const modalElement = document.getElementById('parametreModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
