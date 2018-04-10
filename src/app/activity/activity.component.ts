import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Planning } from '../planning';
import { Activity } from '../activity';
import { Dayshift } from '../dayshift';
import { ActivityService } from '../activity.service';
import { PlanningService } from '../planning.service';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnChanges {
    @Input() day: any;
    hours: Array<any>;
    plannings: Array<Planning>;
    activities: Array<Activity>;
    planning: Planning;

    constructor(private planningService: PlanningService) {
        this.hours = [];
        this.plannings = new Array<Planning>();
    }

    ngOnInit() {
        this.showDayPlanning(this.day);
        for (let i = 0; i < 6; ++i ) {
            let startDay = 10 + i*2;
            this.hours[i] = moment().hours(startDay).format('HH:00');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.day) {
            this.showDayPlanning(this.day);
        }
    }

    showDayPlanning(day: any) {
        this.planningService.plannings.subscribe(
            (plannings: Array<Planning>) => {
                if(plannings.length > 0) {
                    this.plannings = plannings;
                    for(let i = 0; i < this.plannings.length; ++i) {
                        let index = this.plannings.findIndex((p: Planning) => p.date === day);
                        this.planning = this.plannings[index];
                    }
                }
            }
        );
    }
}
