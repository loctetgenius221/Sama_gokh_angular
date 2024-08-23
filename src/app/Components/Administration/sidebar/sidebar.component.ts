// sidebar.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommuneComponent } from '../commune/commune.component';
import { UtilisateursComponent } from '../utilisateurs/utilisateurs.component';
import { FoumulaireComponent } from '../foumulaire/foumulaire.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, DashboardComponent, CommuneComponent, UtilisateursComponent, FoumulaireComponent, RouterLink,RouterOutlet,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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
