import { Routes } from '@angular/router';
import { HabitantHomeComponent } from './habitant/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HabitantHomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

