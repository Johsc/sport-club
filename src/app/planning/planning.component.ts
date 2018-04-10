import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthentificationService } from '../authentification.service';
import { Member } from '../member';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
    currentMonth: any;
    currentYear: any;
    weekDays: Array<string>;
    weekDates: Array<any>;
    dayActive: any;
    dayActiveIndex: number;
    selectDay: any;
    count: number = 0;
    role: boolean;

    constructor(
        public dialog: MatDialog,
        private authentService: AuthentificationService) {
            this.weekDays = [
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi",
                "Dimanche"
            ];
            this.weekDates = [];
            this.dayActive = moment().local().format('dddd D MMMM');
    }

    ngOnInit() {
        this.currentMonth = moment().format('MMMM');
        this.currentYear = moment().format('YYYY');
        for (let i = 0; i < 7; i++) {
            this.weekDates[i] = moment().weekday(i);
            this.weekDates[i].format('dddd D MMMM') === this.dayActive ?
            this.dayActiveIndex = i : false
        }
        this.selectDay = moment().format('dddd D MMMM');
        this.checkRole();
    }

    checkRole() {
        this.authentService.member.subscribe(
            (member: Member) => {
                if (member.role === "admin") {
                    this.role = true;
                }
            }
        )
    }

    changeDay(index: number) {
        this.dayActive = this.weekDates[index].format('dddd D MMMM');
        this.selectDay = this.weekDates[index].format('dddd D MMMM');
        console.log(this.selectDay);
        for (let i = 0; i < this.weekDays.length; ++i) {
            this.weekDates[i].format('dddd D MMMM') == this.dayActive ?
            this.dayActiveIndex = i : false
        }
    }

    changeWeek(val: number) {
        this.count = this.count + val;
        for (let i = 0; i < 7; ++i) {
            this.weekDates[i] = moment().weekday(i + this.count);
            this.currentMonth = this.weekDates[4].format('MMMM');
            this.currentYear = this.weekDates[4].format('YYYY');
        }
    }

}
