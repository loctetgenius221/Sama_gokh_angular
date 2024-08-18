import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';

export const routes: Routes = [
     //la route par défaut
     {path:"", pathMatch:'full', redirectTo:'dashboard'},

     //les routes pour les dashboards
     {path:"dashboard", component:DashboardComponent},
];
