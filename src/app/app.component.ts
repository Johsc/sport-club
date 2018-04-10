import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ClubService } from './club.service';
import { MemberService } from './member.service';
import { ActivityService } from './activity.service';
import { PlanningService } from './planning.service';
import { AbonnementService } from './abonnement.service';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    title: string = "CROSSFIT APP";

    constructor(
        private clubService: ClubService,
        private memberService: MemberService,
        private activityService: ActivityService,
        private planningService: PlanningService,
        private aboService: AbonnementService) { }

    ngOnInit() {
        this.clubService.initialize();
        this.memberService.initialize();
        this.activityService.initialize(0);
        this.aboService.initialize(0);
        this.planningService.initialize(0);
    }

    ngAfterViewInit() { }
}
