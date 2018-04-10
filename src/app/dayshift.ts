
import { Activity } from './activity';
import { Creneau } from './creneau';

import * as moment from 'moment';
import 'moment/locale/fr';

export class Dayshift {
    id: number;
    date: any;
    activity: Activity;
    creneaux: Array<Creneau>;

    constructor(
        id: number,
        date: any,
        activity: Activity,
        creneau?: Array<Creneau>
    ) {
        this.id = id;
        this.date = moment().add(date, 'days').format('dddd D MMMM');
        this.activity = activity;
        this.creneaux = [null, null, null, null, null, null];
    }
}
