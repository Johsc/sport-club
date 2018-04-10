import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Member } from '../member';
import { MemberService } from '../member.service';
import { MemberComponentDialog } from './member.component-dialog';
import { EditMemberComponentDialog } from './edit-member.component-dialog';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css']
})
export class ListMembersComponent implements OnInit {
    members: Array<Member>;
    displayMembers: BehaviorSubject<Array<Member>>;
    search: string;
    clicked: boolean;

    constructor(private memberService: MemberService, public dialog: MatDialog) {
        this.displayMembers = new BehaviorSubject([]);
        this.members = new Array<Member>();
        this.memberService.members.subscribe(
            (members: Array<Member>) => {
                this.members = this.orderByName(members);
                this.displayMembers.next(this.members);
            }
        );
    }

    ngOnInit() {  }

    orderByName(obj) {
        return obj.sort(function(a, b) {
            let objA = a.name.toLowerCase();
            let objB = b.name.toLowerCase();
            if (objA < objB)
                return -1
            if (objA > objB)
                return 1
            return 0
        });
    }

    filter() {
        let list = this.members;
        let input = this.search.toUpperCase();
        let filtered = list.filter(function(el) {
            let member = el.firstname + el.name;
            return member.toUpperCase().indexOf(input) > -1;
        });
        this.displayMembers.next(filtered);
    }

    delete(id: number) {
        this.memberService.delete(id);
    }

    infosMember(member: Member): void {
        let dialogRef = this.dialog.open(MemberComponentDialog, {
            width: '50%',
            height: '70%',
            data: {
                member: member
            }
        });
    };

    editMember(member: Member): void {
        let dialogRef = this.dialog.open(EditMemberComponentDialog, {
            width: '40%',
            height: '85%',
            data: {
                member: member
            }
        });
    };

}
