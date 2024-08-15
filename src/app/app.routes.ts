import { Routes } from '@angular/router';
import { SidebarComponent } from './Components/Administration/sidebar/sidebar.component';

export const routes: Routes = [

    //la route par défaut
{path:"", pathMatch:'full', redirectTo:'sidebar'},

//les routes pour les visiteurs
{path:"sidebar", component:SidebarComponent},
];



