import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClubsComponent } from './clubs/clubs.component';
import { ClubComponent } from './club/club.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanningComponent } from './planning/planning.component';
import { ActivitiesComponent } from './activities/activities.component';
import { MembersComponent } from './members/members.component';
import { ListMembersComponent } from './list-members/list-members.component';
import { AbonnementsComponent } from './abonnements/abonnements.component';

const routes: Routes = [
    { path: '', redirectTo: '/clubs', pathMatch: 'full'},
    { path: 'clubs', component: ClubsComponent },
    {
    path: 'club/:id',
    component: ClubComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'planning', component: PlanningComponent },
        { path: 'activities', component: ActivitiesComponent },
        {
        path: 'members',
        component: MembersComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListMembersComponent },
            { path: 'abonnements', component: AbonnementsComponent }
        ]}
    ]},
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
