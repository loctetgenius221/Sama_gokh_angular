import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommunesService } from '../../../Services/communes.service';
import { AuthService } from '../../../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-muni',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-muni.component.html',
  styleUrl: './sidebar-muni.component.css'
})
export class SidebarMuniComponent implements OnInit {
  nomCommune: string | undefined; // Variable pour stocker le nom de la commune

  constructor(private communesService: CommunesService,private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    // Appel au service pour récupérer les informations de la municipalité connectée
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.nomCommune = data.nom_commune; // Assigner le nom de la commune à la variable
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité', error);
      }
    );
  }

  logout(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.authService.logout().subscribe(
      () => {
        // Effacer les données de session après une déconnexion réussie
        this.authService.clearSession();
        // Rediriger vers la page de connexion
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }
}
