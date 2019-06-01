import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimetableComponent } from './timetable/timetable.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/timetable',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      { 
        path: 'timetable',
        component: TimetableComponent
      },
      { 
        path: 'login',
        component: LoginComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
