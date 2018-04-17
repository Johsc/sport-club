import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthentificationService } from '../authentification.service';
import { ClubService } from '../club.service';
import { MemberService } from '../member.service';
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
        private memberService: MemberService) {
            this.memberService.members.subscribe(
                (members: Array<Member>) => this.members = members);
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    login() {
        let index = this.data.clubIndex;
        if(this.identifiant) {
            this.dialogRef.close();
            this.memberService.loginDemo(this.identifiant);
            this.clubLink = `/club/${index}`;
            this.router.navigateByUrl(this.clubLink);
        }
        // for (let i = 0; i < this.members.length; ++i) {
        //     if(this.identifiant === this.members[i].firstname) {
        //         this.dialogRef.close();
        //         this.authentService.getMember(this.members[i]);
        //         this.clubLink = `/club/${this.data.club.id}`;
        //         this.router.navigateByUrl(this.clubLink);
        //     } else {
        //         this.invalid = true;
        //         this.clubLink = "/clubs";
        //     }
        // }
    }
}
