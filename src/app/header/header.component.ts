import { Component, LOCALE_ID , OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationsService } from '../Services/notifications.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }, // Utilise la locale française pour ce composant
    DatePipe
  ]
})
export class HeaderComponent implements OnInit {

  notifications: any[] = [];
  constructor(private router: Router, private notificationsService: NotificationsService,
    private datePipe: DatePipe) {}

    ngOnInit(): void {
  
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
