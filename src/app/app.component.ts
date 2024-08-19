import { Component } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitantHomeComponent } from './habitant/home/home.component';
import { ProfileComponent } from './habitant/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule , ReactiveFormsModule,HabitantHomeComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sama_gokh_angular';
}

