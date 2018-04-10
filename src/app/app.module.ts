import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuMemberComponent } from './menu-member/menu-member.component';
import { MemberService } from './member.service';
import { PlanningComponent } from './planning/planning.component';
import { ActivityComponent } from './activity/activity.component';
import { CreneauComponent } from './creneau/creneau.component';
import { CreneauComponentDialog } from './creneau/creneau.component-dialog';
import { AddCreneauComponent } from './add-creneau/add-creneau.component';
import { AddCreneauComponentDialog } from './add-creneau/add-creneau.component-dialog';
import { AppRoutingModule } from './/app-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberComponentDialog } from './list-members/member.component-dialog';
import { EditMemberComponentDialog } from './list-members/edit-member.component-dialog';
import { ActivitiesComponent } from './activities/activities.component';
import { AddActivityComponentDialog } from './activities/add-activity.component-dialog';
import { ActivityService } from './activity.service';
import { PlanningService } from './planning.service';
import { AbonnementService } from './abonnement.service';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import { AddAboComponentDialog } from './abonnements/add-abo.component-dialog';
import { ListMembersComponent } from './list-members/list-members.component';
import { ClubService } from './club.service';
import { ClubsComponent } from './clubs/clubs.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthentificationService } from './authentification.service';
import { ClubComponent } from './club/club.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuAdminComponent,
        MenuMemberComponent,
        PlanningComponent,
        ActivityComponent,
        CreneauComponent,
        CreneauComponentDialog,
        AddCreneauComponent,
        AddCreneauComponentDialog,
        MembersComponent,
        MemberComponentDialog,
        EditMemberComponentDialog,
        ActivitiesComponent,
        AddActivityComponentDialog,
        AbonnementsComponent,
        AddAboComponentDialog,
        ListMembersComponent,
        ClubsComponent,
        LoginComponent,
        DashboardComponent,
        ClubComponent
    ],
    entryComponents: [
        CreneauComponentDialog,
        AddCreneauComponentDialog,
        MemberComponentDialog,
        EditMemberComponentDialog,
        AddActivityComponentDialog,
        AddAboComponentDialog,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [MemberService, ActivityService, PlanningService, AbonnementService, ClubService, AuthentificationService],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
