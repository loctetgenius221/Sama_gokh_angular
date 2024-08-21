import { Routes } from '@angular/router';
import { SidebarMuniComponent } from './Components/Municipalite/sidebar-muni/sidebar-muni.component';
import { DashboardComponent } from './Components/Municipalite/dashboard/dashboard.component';
import { ProjetComponent } from './Components/Municipalite/projet/projet.component';
import { HabitantComponent } from './Components/Municipalite/habitant/habitant.component';
import { AjoutProjetComponent } from './Components/Municipalite/ajout-projet/ajout-projet.component';
import { DetailProjetComponent } from './Components/Municipalite/detail-projet/detail-projet.component';
import { ModifierProjetComponent } from './Components/Municipalite/modifier-projet/modifier-projet.component';
import { DetailHabitantComponent } from './Components/Municipalite/detail-habitant/detail-habitant.component';

import { DetailProjetHabitantComponent } from './Components/Municipalite/detail-projet-habitant/detail-projet-habitant.component';


export const routes: Routes = [
    {
        path: '',component: SidebarMuniComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'projet', component: ProjetComponent },
          { path: 'projet/ajouter', component: AjoutProjetComponent },
          { path: 'projet/detail/projet/:id', component: DetailProjetComponent},
          { path: 'projet/modifier/:id',component: ModifierProjetComponent},
          { path: 'habitant', component: HabitantComponent },
          { path: 'habitant/detail/habitant/:id', component: DetailHabitantComponent},
          { path: 'habitant/detail/projet/:id', component:DetailProjetHabitantComponent},
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]  
    }
];