import { Component, Inject, LOCALE_ID,OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationsService } from '../../../Services/notifications.service';
import { Router, RouterModule } from '@angular/router';
import { ParametreComponent } from '../parametre/parametre.component';
import { AuthService } from '../../../Services/auth/auth.service';
import { CommunesService } from '../../../Services/communes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar-muni',
  standalone: true,
  imports: [CommonModule, RouterModule, ParametreComponent],
  templateUrl: './sidebar-muni.component.html',
  styleUrls: ['./sidebar-muni.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }, // Utilise la locale française pour ce composant
    DatePipe
  ]
})
export class SidebarMuniComponent implements OnInit {
  nomCommune: string | undefined;
  notifications: any[] = []; // Tableau pour stocker les notifications

  constructor(
    private communesService: CommunesService,
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService,
    private datePipe: DatePipe // Injecte le DatePipe
  ) {}

  ngOnInit(): void {
    this.communesService.getMunicipaliteConnectee().subscribe(
      (data) => {
        this.nomCommune = data.nom_commune;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de la municipalité', error);
      }
    );

    this.loadNotifications(); // Charger les notifications au démarrage
  }

  loadNotifications() {
    this.notificationsService.getAllNotifications().subscribe(
      (data) => {
        console.log('Notifications reçues:', data); 
        this.notifications = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
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

  openNotificationsModal() {
    const modalElement = document.getElementById('notificationsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteNotification(id: number) {
    // Logique pour supprimer la notification
    this.notificationsService.deleteNotification(id).subscribe(
      () => {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
      },
      error => {
        console.error('Erreur lors de la suppression de la notification', error);
      }
    );
  }
}
