import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

import { ActivityService } from '../activity.service';
import { MemberService } from '../member.service';
import { Activity } from '../activity';
import { Dayshift } from '../dayshift';
import { Creneau } from '../creneau';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
    selector: 'add-creneau.component-dialog',
    templateUrl: 'add-creneau.component-dialog.html',
    styleUrls: ['./add-creneau.component-dialog.css']
})
export class AddCreneauComponentDialog {
    activities: Array<Activity>;
    idCount: number;
    checked: boolean = false;
    max: number = 15;
    min: number = 0;
    step: number = 1;
    limit: number;

    constructor(
        public dialogRef: MatDialogRef<AddCreneauComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private activityService: ActivityService,
        private memberService: MemberService) {
            console.log(data);
            this.activities = new Array<Activity>();
            this.activityService.activities.subscribe(
                (activities: Array<Activity>) => {
                    this.activities = activities;
                    this.limit = this.activities[data.activityIndex].limitCreneau;
                }
            );
            this.memberService.allCourses.subscribe(
                (abos: Array<Creneau>) => {
                    this.idCount = abos.length;
                }
            );
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addCreneau() {
        let newCreneau = new Creneau(
                this.idCount,
                this.data.dayshift.activity.name,
                this.data.day,
                this.data.hDebut,
                this.data.hFin,
                this.limit,
                true);
        let index = this.data.hourIndex;
        if (index >= 0) {
            this.data.dayshift.creneaux.splice(index, 1, newCreneau);
        }
        this.memberService.addCourse(newCreneau);
        this.dialogRef.close();
    }
}
