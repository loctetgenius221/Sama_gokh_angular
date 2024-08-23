import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';
import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';
import { SidebarMuniComponent } from './Components/Municipalite/sidebar-muni/sidebar-muni.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,SidebarComponent,SidebarMuniComponent,RouterLink],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sama_gokh_angular';
}
