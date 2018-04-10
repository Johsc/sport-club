import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AddActivityComponentDialog } from './add-activity.component-dialog';

import { ActivityService } from '../activity.service';
import { PlanningService } from '../planning.service';
import { Activity } from '../activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    activities: Array<Activity>;

    constructor(
        private activityService: ActivityService,
        private planningService: PlanningService,
        public dialog: MatDialog) {
            this.activities = new Array<Activity>();
            this.activityService.activities.subscribe(
                (activities: Array<Activity>) => {
                    this.activities = activities;
                }
            );
        }

    ngOnInit() { }

    editLimit(activity: Activity, val: number) {
        activity.limitCreneau = activity.limitCreneau + val;
        this.activityService.update(activity);
    }

    delete(id: number) {
        this.activityService.delete(id);
        this.planningService.removeDayshift(id);
    }

    addAct(): void {
        let dialogRef = this.dialog.open(AddActivityComponentDialog, {
            width: '30%',
            height: '60%',
            data: { }
        }
    )};
}
