import { Routes } from '@angular/router';

import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';
import { DashboardComponent as AdminDashboardComponent } from './Components/Administration/dashboard/dashboard.component';
import { CommuneComponent } from './Components/Administration/commune/commune.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { FoumulaireComponent } from './Components/Administration/foumulaire/foumulaire.component';
import { UtilisateursComponent } from './Components/Administration/utilisateurs/utilisateurs.component';
import { CommunesByRegionComponent } from './Components/Administration/communes-by-region/communes-by-region.component';

import { SidebarMuniComponent } from './Components/Municipalite/sidebar-muni/sidebar-muni.component';
import { DashboardComponent as MuniDashboardComponent } from './Components/Municipalite/dashboard/dashboard.component';
import { ProjetComponent } from './Components/Municipalite/projet/projet.component';
import { HabitantComponent } from './Components/Municipalite/habitant/habitant.component';
import { AjoutProjetComponent } from './Components/Municipalite/ajout-projet/ajout-projet.component';
import { DetailProjetComponent } from './Components/Municipalite/detail-projet/detail-projet.component';
import { ModifierProjetComponent } from './Components/Municipalite/modifier-projet/modifier-projet.component';
import { DetailHabitantComponent } from './Components/Municipalite/detail-habitant/detail-habitant.component';
import { DetailProjetHabitantComponent } from './Components/Municipalite/detail-projet-habitant/detail-projet-habitant.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Administration Routes
  {
    path: 'sidebar',
    component: SidebarComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'communes', component: CommuneComponent },
      { path: 'utilisateurs/:communeId', component: UtilisateursComponent },
      { path: 'commune/add', component: FoumulaireComponent },
      { path: 'commune/edit/:id', component: FoumulaireComponent },
      { path: 'communes/:region', component: CommunesByRegionComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Municipalité Routes
  {
    path: 'sidebar1',
    component: SidebarMuniComponent,
    children: [
      { path: 'dashboard', component: MuniDashboardComponent },
      { path: 'projet', component: ProjetComponent },
      { path: 'projet/ajouter', component: AjoutProjetComponent },
      { path: 'projet/detail/projet/:id', component: DetailProjetComponent },
      { path: 'projet/modifier/:id', component: ModifierProjetComponent },
      { path: 'habitant', component: HabitantComponent },
      { path: 'habitant/detail/habitant/:id', component: DetailHabitantComponent },
      { path: 'habitant/detail/projet/:id', component: DetailProjetHabitantComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
