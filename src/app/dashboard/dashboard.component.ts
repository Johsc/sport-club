import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from '../authentification.service';
import { Member } from '../member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    member: Member;

    constructor(private authentService: AuthentificationService) {
        this.member = new Member();
        this.authentService.member.subscribe(
            (member: Member) => this.member = member);
    }

    ngOnInit() {
    }

}
