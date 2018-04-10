
import { Member } from './member';
import { Activity } from './activity';

export class Creneau {
    id: number;
    activity: string;
    date: any;
    hDebut: string;
    hFin: string;
    limitCreneau: number;
    activated: boolean;
    registred: Array<Member>;

    constructor(
        id: number,
        activity: string,
        date: any,
        hDebut: string,
        hFin: string,
        limitCreneau: number,
        activated: boolean,
        registred?: Array<Member>
    ) {
        this.id = id;
        this.activity = activity;
        this.date = date;
        this.hDebut = hDebut;
        this.hFin = hFin;
        this.limitCreneau = limitCreneau;
        this.activated = activated;
        this.registred = [];
    }
}
