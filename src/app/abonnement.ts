
export class Abonnement {
    id: number;
    name: string;
    limitDay: number;
    limitWeek: number;

    constructor(
        id: number,
        name: string,
        limitDay?: number,
        limitWeek?: number
    ) {
        this.id = id;
        this.name = name;
        this.limitDay = limitDay;
        this.limitWeek = limitWeek;
    }
}
