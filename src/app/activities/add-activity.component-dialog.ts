import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

import { ActivityService } from '../activity.service';
import { PlanningService } from '../planning.service';
import { Activity } from '../activity';

@Component({
    selector: 'add-activity.component-dialog',
    templateUrl: 'add-activity.component-dialog.html',
    styleUrls: ['./add-activity.component-dialog.css']
})
export class AddActivityComponentDialog {
    activities: Array<Activity>;
    activity: Activity;
    checked: boolean = false;
    max: number = 15;
    min: number = 0;
    step: number = 1;
    limit: number = 5;

    constructor(
        public dialogRef: MatDialogRef<AddActivityComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private activityService: ActivityService,
        private planningService: PlanningService) {
            this.activity = new Activity(null, null, 5);
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit(form) {
        let data = JSON.parse(JSON.stringify(this.activity));
        if (this.activity.name) {
            this.activityService.create(data);
            this.planningService.addDayshift(data);
            this.dialogRef.close();
            form.resetForm();
        }
    }
}
