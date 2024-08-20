import { Component, OnInit } from '@angular/core';
import { CommunesService } from '../../../Services/communes.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  communes: any[] = [];
  totalCommunes: number = 0;

  constructor(private communesService: CommunesService) {}

  ngOnInit(): void {
    this.loadCommunes();
  }

  loadCommunes(): void {
    this.communesService.getAllCommunes().subscribe(
      (data) => {
        this.communes = data;
        this.totalCommunes = data.length;
      },
      (error) => {
        console.error('Erreur lors du chargement des communes:', error);
      }
    );
  }
}
