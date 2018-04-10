import { Creneau } from './creneau';

export class Activity {
    id: number;
    name: string;
    limitCreneau: number;

    constructor(id?: number, name?: string, limitCreneau?: number) {
        this.id = id;
        this.name = name;
        this.limitCreneau = limitCreneau;
    }
}
