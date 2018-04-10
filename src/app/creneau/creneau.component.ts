import { Component, Inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CreneauComponentDialog } from './creneau.component-dialog';

import { Member } from '../member';
import { Activity } from '../activity';
import { Dayshift } from '../dayshift';
import { MemberService } from '../member.service';
import { Creneau } from '../creneau';

@Component({
    selector: 'app-creneau',
    templateUrl: './creneau.component.html',
    styleUrls: ['./creneau.component.css']
})
export class CreneauComponent implements OnInit, OnChanges {
    @Input() dayshift: Dayshift;
    @Input() creneau: Creneau;
    @Input() hourIndex: number;
    membersList: Array<Member>;
    labelCreneau: number | string;
    labelLimit: string;
    counter: number;
    full: boolean;

    constructor(public dialog: MatDialog, private memberService: MemberService) {
        this.membersList = new Array<Member>();
        this.memberService.members.subscribe(
            (members: Array<Member>) => {
                this.membersList = members;
            }
        );
    }

    checklimitCreneau(counter: number) {
        if (counter <= 0) {
            this.labelCreneau = "COMPLET";
            this.labelLimit = "";
            this.full = true;
        } else {
            this.labelCreneau = this.creneau.registred.length;
            this.labelLimit = ` / ${this.creneau.limitCreneau}`;
            this.full = false;
        }
    }

    ngOnInit() {
        this.counter = this.creneau.limitCreneau - this.creneau.registred.length;
        this.checklimitCreneau(this.counter);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dayshift) {
            this.ngOnInit();
        }
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CreneauComponentDialog, {
            width: '35%',
            height: '90%',
            data: {
                dayshift: this.dayshift,
                creneau: this.creneau,
                membersList: this.membersList,
                hourIndex: this.hourIndex
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });
    };
}
