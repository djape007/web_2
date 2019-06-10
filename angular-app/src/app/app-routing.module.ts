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
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { CheckTicketComponent } from './check-ticket/check-ticket.component';
import { BoughtTicketsComponent } from './bought-tickets/bought-tickets.component';
import { RoleGuard } from './services/role.guard';
import { EditLineComponent } from './edit-line/edit-line.component';

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
        path: 'edit-lines',
        redirectTo: '/home/(rightRouter:izmlinije)',
        pathMatch: 'prefix',
      },
      {
        path: 'bought-tickets',
        redirectTo: '/home/(rightRouter:kupkart)',
        pathMatch: 'prefix',
      },
      {
        path: 'verification',
        redirectTo: '/home/(rightRouter:ver)',
        pathMatch: 'prefix',
      },
      {
        path: 'check-ticket',
        redirectTo: '/home/(rightRouter:chtick)',
        pathMatch: 'prefix',
      },
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
      {
        path: 'ver',
        component: VerifyUserComponent,
        outlet: 'rightRouter',
        canActivate: [RoleGuard], 
        data: { expectedRole: 'Controller'}
      },
      {
        path: 'kupkart',
        component: BoughtTicketsComponent,
        outlet: 'rightRouter',
        canActivate: [RoleGuard], 
        data: { expectedRole: 'AppUser'}
      },
      {
        path: 'chtick',
        component: CheckTicketComponent,
        outlet: 'rightRouter',
        canActivate: [RoleGuard], 
        data: { expectedRole: 'Controller'}
      },
      {
        path: 'izmlinije',
        component: EditLineComponent,
        outlet: 'rightRouter',
        canActivate: [RoleGuard], 
        data: { expectedRole: 'Admin'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
