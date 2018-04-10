import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Member } from './member';


@Injectable()
export class AuthentificationService {
    member: BehaviorSubject<Member>;

    constructor() {
        this.member = new BehaviorSubject(new Member());
    }

    getMember(m: Member) {
        let tmp = m;
        this.member.next(tmp);
    }
}
