import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ClubService } from './club.service';
import { Club } from './club';
import { Activity } from './activity';
import { ACTIVITIES } from './mock-activities';

@Injectable()
export class ActivityService {
    id: number;
    activities: BehaviorSubject<Array<Activity>>;

    constructor(private clubService: ClubService, private route: ActivatedRoute) {
        this.activities = new BehaviorSubject([]);
    }

    initialize(index: number) {
        this.clubService.clubs.subscribe((clubs: Array<Club>) => {
            if(clubs.length > 0) {
                this.activities.next(clubs[index].activities);
            }
        });
    }

    create(activity: Activity) {
        let tmp = this.activities.value;
        let idCount = this.activities.value.length+1;
        let newActivity = new Activity(
            idCount,
            activity.name,
            activity.limitCreneau
        );
        tmp.push(newActivity);
        this.activities.next(tmp);
    }

    delete(id: number) {
        let tmp = this.activities.value;
        let index = tmp.findIndex(
            (a: Activity) => a.id === id);
        if (index >= 0) {
            tmp.splice(index, 1);
            this.activities.next(tmp);
        }
    }

    update(activity: Activity) {
        let tmp = this.activities.value;
        let index = tmp.findIndex(
            (a: Activity) => a.id === activity.id);
        if (index >= 0) {
            tmp.splice(index, 1, activity);
            this.activities.next(tmp);
        }
    }
}
