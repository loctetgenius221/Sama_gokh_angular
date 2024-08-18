import { Routes } from '@angular/router';

import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';

import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';

import { CommuneComponent } from './Components/Administration/commune/commune.component';



export const routes: Routes = [

 

//les routes pour l'admin
{path:"sidebar", component:SidebarComponent},

{path:"", pathMatch:'full', redirectTo:'sidebar'},

//les routes pour les dashboards
{path:"dashboard", component:DashboardComponent},

//les routes pour les communes dans admin
{path:"communes", component:CommuneComponent},
];


