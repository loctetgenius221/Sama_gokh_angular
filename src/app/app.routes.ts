import { Routes } from '@angular/router';
import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';
import { DashboardComponent } from './Components/Administration/dashboard/dashboard.component';
import { CommuneComponent } from './Components/Administration/commune/commune.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { FoumulaireComponent } from './Components/Administration/foumulaire/foumulaire.component';
import { UtilisateursComponent } from './Components/Administration/utilisateurs/utilisateurs.component';

export const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'login' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{
path: 'sidebar',
component: SidebarComponent,
children: [
{ path: 'dashboard', component: DashboardComponent },
{ path: 'communes', component: CommuneComponent },
{ path: 'utilisateurs', component: UtilisateursComponent },
{ path: 'commune/add', component: FoumulaireComponent },
  { path: 'commune/edit/:id', component: FoumulaireComponent },
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]
}
];


