import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommuneComponent } from '../commune/commune.component';
import { UtilisateursComponent } from '../utilisateurs/utilisateurs.component';
import { FoumulaireComponent } from '../foumulaire/foumulaire.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, DashboardComponent,CommuneComponent,UtilisateursComponent,FoumulaireComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // Variable d'état pour contrôler la visibilité de la sidebar
  isCollapsed = false;

  // Méthode pour basculer l'état de la sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
