import { Routes } from '@angular/router';

import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';

import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';

import { CommuneComponent } from './Components/Administration/commune/commune.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';



export const routes: Routes = [

 

//les routes pour l'admin
{path:"sidebar", component:SidebarComponent},

{path:"", pathMatch:'full', redirectTo:'login'},

//les routes pour les dashboards
{path:"dashboard", component:DashboardComponent},

//les routes pour les communes dans admin
{path:"communes", component:CommuneComponent},

//route pour la connection

{ path: 'login', component: LoginComponent },

//route pour l'inscription
  { path: 'register', component: RegisterComponent },

 
];


