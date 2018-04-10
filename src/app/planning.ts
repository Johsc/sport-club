import { Dayshift } from './dayshift';
import { Creneau } from './creneau';

import * as moment from 'moment';
import 'moment/locale/fr';

export class Planning {
    date: any;
    dayshifts: Array<Dayshift>;
    limitDay: number;
    limitWeek: number;

    constructor(date: any, dayshifts: Array<Dayshift>, limitDay?: Number, limitWeek?: number) {
        this.date = moment().add(date, 'days').format('dddd D MMMM');
        this.dayshifts = dayshifts;
        this.limitDay = 1;
        this.limitWeek = 2;
    }
}
