import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationService } from '../authentification.service';
import { ActivityService } from '../activity.service';
import { PlanningService } from '../planning.service';
import { AbonnementService } from '../abonnement.service';
import { Member } from '../member';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
    id: number;
    role: boolean;
    clubsLink: string;

    constructor(
        private router: Router,
        private authentService: AuthentificationService,
        private activityService: ActivityService,
        private planningService: PlanningService,
        private aboService: AbonnementService) {  }

    ngOnInit() {
        this.checkRole();
        // Initialisation des services si déjà loggé ?
    }

    checkRole() {
        this.authentService.member.subscribe(
            (member: Member) => {
                if (member.role === "admin") {
                    this.role = true;
                } else if (member.role == undefined) {
                    this.clubsLink = `/clubs`;
                    this.router.navigateByUrl(this.clubsLink);
                }
            }
        )
    }
}
