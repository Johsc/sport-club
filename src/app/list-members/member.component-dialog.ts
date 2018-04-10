import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Member } from '../member';

@Component({
    selector: 'member.component-dialog',
    templateUrl: 'member.component-dialog.html',
    styleUrls: ['./member.component-dialog.css']
})
export class MemberComponentDialog {
    member: Member;

    constructor(
        public dialogRef: MatDialogRef<MemberComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
            this.member = data.member;
            console.log(data.member);
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
