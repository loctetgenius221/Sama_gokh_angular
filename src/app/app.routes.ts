import { Routes } from '@angular/router';
import { HabitantHomeComponent } from './habitant/home/home.component';
import { ProfileComponent } from './habitant/profile/profile.component';
import { AddProjectComponent } from './habitant/add-project/add-project.component';
import { EditProjectComponent } from './habitant/edit-project/edit-project.component';
import { ViewProjectComponent } from './habitant/view-project/view-project.component';
import { ListProjectsComponent } from './habitant/list-projects/list-projects.component';

export const routes: Routes = [
  { path: "home", component: HabitantHomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: "project",component: ViewProjectComponent},
  { path: 'list-projects', component: ListProjectsComponent }

];

