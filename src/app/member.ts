import { Abonnement } from './abonnement';

export class Member {
    id: number;
    firstname: string;
    name: string;
    abonnement: Abonnement;
    email: string;
    phone: string;
    inscriptions: Array<any>;
    role: string;

    constructor(
        id?:number,
        firstname?: string,
        name?: string,
        abo?: Abonnement,
        email?: string,
        phone?: string,
        inscriptions?: Array<any>,
        role?: string
    ){
        this.id = id;
        this.firstname = firstname;
        this.name = name;
        this.abonnement = abo;
        this.inscriptions = [];
        this.role = role;
    }
}
