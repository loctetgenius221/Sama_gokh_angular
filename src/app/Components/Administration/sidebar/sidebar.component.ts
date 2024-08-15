import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    // Variable d'état pour contrôler la visibilité de la sidebar
    isCollapsed = false;

    // Méthode pour basculer l'état de la sidebar
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
}
