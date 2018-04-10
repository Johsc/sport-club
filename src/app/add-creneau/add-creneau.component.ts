import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AddCreneauComponentDialog } from './add-creneau.component-dialog'

import { Activity } from '../activity';
import { Dayshift } from '../dayshift';
import { Creneau } from '../creneau';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-add-creneau',
  templateUrl: './add-creneau.component.html',
  styleUrls: ['./add-creneau.component.css']
})
export class AddCreneauComponent implements OnInit {
    @Input() day: any;
    @Input() dayshift: Dayshift;
    @Input() hourIndex: number;
    @Input() activityIndex: number;
    hours: Array<any>;
    hDebut: any;
    hFin: any;

    constructor(public dialog: MatDialog) {
        this.hours = [];
    }

    hoursTab() {
        for (let i = 0; i < 7; ++i ) {
            let startDay = 10 + i*2;
            this.hours[i] = moment().hours(startDay).format('HH:00');
        }
    }

    ngOnInit() {
        this.hoursTab();
    }

    activateCreneau(): void {
        this.hDebut = this.hours[this.hourIndex];
        this.hFin = this.hours[this.hourIndex+1];
        let dialogRef = this.dialog.open(AddCreneauComponentDialog, {
            width: '35%',
            height: '80%',
            data: {
                day: this.day,
                dayshift: this.dayshift,
                hDebut: this.hDebut,
                hFin: this.hFin,
                hourIndex: this.hourIndex,
                activityIndex: this.activityIndex
            }
        }
    )};

    disabled() {
        let currentDay = moment().local();
        if (moment(this.day,"dddd D MMMM").isBefore(currentDay, 'day')) {
            return false;
        } else if (moment(this.day, "dddd D MMMM").isSame(currentDay, 'day')
            && moment(this.hours[this.hourIndex], 'HH:00').isBefore(currentDay)) {
            return false;
        } else {
            return true;
        }
    }
}
