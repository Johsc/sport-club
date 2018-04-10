import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthentificationService } from '../authentification.service';
import { ClubService } from '../club.service';
import { ActivityService } from '../activity.service';
import { PlanningService } from '../planning.service';
import { AbonnementService } from '../abonnement.service';
import { Club } from '../club';
import { Member } from '../member';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    members: Array<Member>;
    hide: boolean = true;
    clubLink: string;
    identifiant: string;
    invalid: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router,
        private authentService: AuthentificationService,
        private activityService: ActivityService,
        private planningService: PlanningService,
        private aboService: AbonnementService) {
            this.members = data.club.members;
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    login() {
        let index = this.data.clubIndex;
        for (let i = 0; i < this.members.length; ++i) {
            if(this.identifiant === this.members[i].firstname) {
                this.dialogRef.close();
                this.authentService.getMember(this.members[i]);
                this.clubLink = `/club/${this.data.club.id}`;
                this.router.navigateByUrl(this.clubLink);
            } else {
                this.invalid = true;
                this.clubLink = "/clubs";
            }
        }

    }
}
