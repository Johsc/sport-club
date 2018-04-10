import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    id: number;
    clicked: boolean;
    location: string;

    constructor(private route: ActivatedRoute, location: Location) {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.clicked = true;
        this.location = location.path();
    }

    ngOnInit() {
        if (this.location == "/club/{{id}}/members/abonnements") {
            this.clicked = false;
        }
    }
}
