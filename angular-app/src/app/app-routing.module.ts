import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimetableComponent } from './timetable/timetable.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: TimetableComponent,
        outlet: 'leftRouter'
      },
      {
        path: 'timetable',
        redirectTo: '/home/(leftRouter:tt)',
        pathMatch: 'prefix',
      },
      {
        path: 'login',
        redirectTo: '/home/(rightRouter:lo)',
        pathMatch: 'prefix',
      },
      {
        path: 'tt',
        component: TimetableComponent,
        outlet: 'leftRouter'
      },
      {
        path: 'lo',
        component: LoginComponent,
        outlet: 'rightRouter'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
