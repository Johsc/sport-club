import { Member } from './member';
import { Activity } from './activity';
import { Planning } from './planning';
import { Abonnement } from './abonnement';

export class Club {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    fb: string;
    members: Array<Member>;
    activities: Array<Activity>;
    plannings: Array<Planning>;
    abonnements: Array<Abonnement>;

    constructor(
        id: number,
        name: string,
        address: string,
        email: string,
        phone?: string,
        website?: string,
        fb?: string
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.fb = fb;
        this.members = [];
        this.activities = [];
        this.plannings = [];
        this.abonnements = [];
    }
}
