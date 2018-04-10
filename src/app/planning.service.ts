import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ClubService } from './club.service';
import { Club } from './club';
import { Activity } from './activity';
import { Dayshift } from './dayshift';
import { Planning } from './planning';

@Injectable()
export class PlanningService {
    plannings: BehaviorSubject<Array<Planning>>;

    constructor(private clubService: ClubService) {
        this.plannings = new BehaviorSubject([]);
    }

    initialize(index: number) {
        this.clubService.clubs.subscribe(
            (clubs: Array<Club>) => {
                if(clubs.length > 0) {
                    let planning = [];
                    for (let i = -100; i < 366; ++i) {
                        let dayshifts = [];
                        for (let j = 0; j < clubs[index].activities.length; ++j) {
                            dayshifts.push(new Dayshift(j, i, clubs[index].activities[j]));
                        }
                        planning.push(new Planning(i, dayshifts));
                    }
                    this.plannings.next(planning);
                    clubs[index].plannings = planning;
                }
            }
        );
    }

    addDayshift(activity: Activity) {
        let tmp = this.plannings.value;
        let idCount = this.plannings.value[100].dayshifts.length;
        for (let i = 100; i < 466; ++i) {
            let date = i - 100;
            tmp[i].dayshifts.push(new Dayshift(idCount, date, activity));
        }
        this.plannings.next(tmp);
    }

    removeDayshift(id: number) {
        let tmp = this.plannings.value;
        for (let i = 100; i < tmp.length; ++i) {
            let index = tmp[i].dayshifts.findIndex(
                (d: Dayshift) => d.activity.id === id);
            if (index >= 0) {
                tmp[i].dayshifts.splice(index, 1);
            }
        }
        this.plannings.next(tmp);
        console.log(this.clubService.clubs);
    }
}
