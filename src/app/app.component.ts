import { Component } from '@angular/core';


import { RouterLink, RouterOutlet } from '@angular/router';
// import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';
// import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';
// import { SidebarMuniComponent } from './Components/Municipalite/sidebar-muni/sidebar-muni.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitantHomeComponent } from './habitant/home/home.component';
import { ProfileComponent } from './habitant/profile/profile.component';
import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';
import { SidebarMuniComponent } from './Components/Municipalite/sidebar-muni/sidebar-muni.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,SidebarMuniComponent,RouterLink,RouterModule, CommonModule , ReactiveFormsModule,HabitantHomeComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sama_gokh_angular';
}

