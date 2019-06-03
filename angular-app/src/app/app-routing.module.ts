import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './timetable/timetable.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/timetable',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'timetable',
        redirectTo: '/home/(leftRouter:tt)',
        pathMatch: 'prefix',
      },
      {
        path: 'login',
        redirectTo: '/home/(rightRouter:log)',
        pathMatch: 'prefix',
      },
      {
        path: 'register',
        redirectTo: '/home/(rightRouter:reg)',
        pathMatch: 'prefix',
      },
      {
        path: 'tickets',
        redirectTo: '/home/(leftRouter:tic)',
        pathMatch: 'prefix',
      },
      {
        path: 'profile',
        redirectTo: '/home/(rightRouter:prof)',
        pathMatch: 'prefix',
      },
      {
        path: 'tt',
        component: TimetableComponent,
        outlet: 'leftRouter'
      },
      {
        path: 'reg',
        component: RegisterComponent,
        outlet: 'rightRouter'
      },
      {
        path: 'tic',
        component: TicketComponent,
        outlet: 'leftRouter'
      },
      {
        path: 'log',
        component: LoginComponent,
        outlet: 'rightRouter'
      },
      {
        path: 'prof',
        component: ProfileComponent,
        outlet: 'rightRouter',
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
