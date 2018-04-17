import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Member } from './member';
import { Creneau } from './creneau';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class MemberService {
    members: BehaviorSubject<Array<Member>>;
    allCourses: BehaviorSubject<Array<Creneau>>;

    constructor(private http: HttpClient, private authentService: AuthentificationService) {
        this.members = new BehaviorSubject([]);
        this.allCourses = new BehaviorSubject([]);
    }

    initialize() {
        this.http.get('http://localhost:4200/assets/mock-members.json')
            .subscribe((members: Member[]) => this.members.next(members));
    }

    // initialize() {
    //     this.http.get('http://www.bordeu.fr/sport_club/api/users/')
    //         .subscribe((members: Member[]) => this.members.next(members));
    // }

    create(member: Member) {
        let tmp = this.members.value;
        let idCount = this.members.value.length+1;
        let newMember = new Member(
            idCount,
            member.firstname,
            member.name,
            member.abonnement,
            member.phone,
            member.email
        );
        tmp.push(newMember);
        this.members.next(tmp);
    }

    loginDemo(firstname) {
        let tmp = this.members.value;
        let idCount = this.members.value.length+1;
        let newMember = new Member(
            idCount,
            firstname,
            " ",
            {
                "id": 1,
                "name": "Standard",
                "limitDay": 1,
                "limitWeek": 2
            },
            null,
            null,
            [],
            "admin"
        );
        tmp.push(newMember);
        this.members.next(tmp);
        this.authentService.getMember(newMember);
    }

    update(member: Member) {
        let tmp = this.members.value;
        let index = tmp.findIndex(
            (m: Member) => m.id === member.id);
        if (index >= 0) {
            tmp.splice(index, 1, member);
            this.members.next(tmp)
        }
    }

    delete(id: number) {
        let tmp = this.members.value;
        let index = tmp.findIndex(
            (m: Member) => m.id === id);
        if (index >= 0) {
            tmp.splice(index, 1);
            this.members.next(tmp)
        }
    }

    deleteInscr(idMember: number, idCreneau: number) {
        let tmp = this.members.value;
        let indexMember = tmp.findIndex(
            (m: Member) => m.id === idMember);
        if (indexMember >= 0) {
            let indexCreneau = tmp[indexMember].inscriptions.findIndex(
                (c: Creneau) => c.id === idCreneau);
            if (indexCreneau >= 0) {
                tmp[indexMember].inscriptions.splice(indexCreneau, 1);
                this.members.next(tmp);
            }
        }
    }

    addCourse(course: Creneau) {
        let tmp = this.allCourses.value;
        tmp.push(course);
        this.allCourses.next(tmp);
        console.log(tmp);
    }

    removeCourse(id: number) {
        let tmp = this.allCourses.value;
        let index = tmp.findIndex(
            (c: Creneau) => c.id === id);
        if (index >= 0) {
            tmp.splice(index, 1);
            this.allCourses.next(tmp);
        }
        console.log(tmp);
    }
}
