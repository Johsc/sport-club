import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ClubService } from './club.service';
import { Club } from './club';
import { Abonnement } from './abonnement';

@Injectable()
export class AbonnementService {
    abonnements: BehaviorSubject<Array<Abonnement>>;

    constructor(private clubService: ClubService) {
        this.abonnements = new BehaviorSubject([]);
    }

    initialize(index) {
        this.clubService.clubs.subscribe((clubs: Array<Club>) => {
            if (clubs.length > 0) {
                this.abonnements.next(clubs[index].abonnements);
            }
        });
    }

    create(abo: Abonnement) {
        let tmp = this.abonnements.value;
        let idCount = this.abonnements.value.length+1;
        let newAbo = new Abonnement(
            idCount,
            abo.name,
            abo.limitDay,
            abo.limitWeek
        );
        tmp.push(newAbo);
        this.abonnements.next(tmp);
    }

    update(abo: Abonnement) {
        let tmp = this.abonnements.value;
        let index = tmp.findIndex(
            (a: Abonnement) => a.id === abo.id);
        if (index >= 0) {
            tmp.splice(index, 1, abo);
            this.abonnements.next(tmp)
        }
    }

    delete(id: number) {
        let tmp = this.abonnements.value;
        let index = tmp.findIndex(
            (a: Abonnement) => a.id === id);
        if (index >= 0) {
            tmp.splice(index, 1);
            this.abonnements.next(tmp);
        }
    }
}
