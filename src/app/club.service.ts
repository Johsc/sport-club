import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { Club } from './club';

@Injectable()
export class ClubService {
    clubs: BehaviorSubject<Array<Club>>;

    constructor(private http: HttpClient) {
        this.clubs = new BehaviorSubject([]);
    }

    initialize() {
        this.http.get('http://localhost:4200/assets/mock-clubs.json')
            .subscribe((clubs: Club[]) => this.clubs.next(clubs));
    }

    create(club: Club) {
        let tmp = this.clubs.value;
        let idCount = this.clubs.value.length+1;
        let newClub = new Club(
            idCount,
            club.name,
            club.address,
            club.email,
            club.phone,
            club.website,
            club.fb
        );
        tmp.push(newClub);
        this.clubs.next(tmp);
    }

    read(id: number): Observable<Club> {
        return this.clubs.mergeMap(
            (clubs: Array<Club>) => Observable.from(clubs))
                .filter((club) => club.id === id);
    }

    update(club: Club) {
        let tmp = this.clubs.value;
        let index = tmp.findIndex(
            (c: Club) => c.id === club.id);
        if (index >= 0) {
            tmp.splice(index, 1, club);
            this.clubs.next(tmp)
        }
    }

    delete(id: number) {
        let tmp = this.clubs.value;
        let index = tmp.findIndex(
            (c: Club) => c.id === id);
        if (index >= 0) {
            tmp.splice(index, 1);
            this.clubs.next(tmp)
        }
    }
}
