import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimetableComponent } from './timetable/timetable.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
