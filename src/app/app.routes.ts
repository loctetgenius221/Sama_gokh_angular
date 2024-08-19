import { Routes } from '@angular/router';
import { HabitantHomeComponent } from './habitant/home/home.component';
import { ProfileComponent } from './habitant/profile/profile.component';
import { AddProjectComponent } from './habitant/add-project/add-project.component';

export const routes: Routes = [
  { path: "home", component: HabitantHomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'add-project', component: AddProjectComponent }, // Ajouter cette ligne pour le formulaire d'ajout de projet
  { path: "", pathMatch: 'full', redirectTo: '/home'},
];

