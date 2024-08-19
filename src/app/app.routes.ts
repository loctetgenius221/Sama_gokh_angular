import { Routes } from '@angular/router';
import { HabitantHomeComponent } from './habitant/home/home.component';
import { ProfileComponent } from './habitant/profile/profile.component';

export const routes: Routes = [
  { path: "home", component: HabitantHomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "", pathMatch: 'full', redirectTo: '/home'},
];

