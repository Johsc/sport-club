import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Member } from '../member';
import { Abonnement } from '../abonnement';
import { MemberService } from '../member.service';
import { AbonnementService } from '../abonnement.service';

@Component({
    selector: 'edit-member.component-dialog',
    templateUrl: 'edit-member.component-dialog.html',
    styleUrls: ['./edit-member.component-dialog.css']
})
export class EditMemberComponentDialog {
    abonnements: Array<Abonnement>;
    member: Member;
    aboMember: string | Abonnement;
    labelHeader: string;
    hide: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<EditMemberComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private memberService: MemberService,
        private aboService: AbonnementService) {
            this.member = data.member;
            console.log(data.member);
            this.editDialog();
            this.abonnements = new Array<Abonnement>();
            this.aboService.abonnements.subscribe(
                (abo: Array<Abonnement>) => {
                    this.abonnements = abo;
                }
            );
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    editDialog() {
        if (this.member) {
            this.labelHeader = "Modifier le membre";
            this.aboMember = this.data.member.abonnement.name;
        } else {
            this.labelHeader = "Ajouter un membre";
            this.member = new Member();
        }
    }

    submit(form) {
        let data = JSON.parse(JSON.stringify(this.member));
        if (this.member.id >= 0) {
            // Edition de l'article.
            this.memberService.update(data);
            this.dialogRef.close();
        } else {
            // Création de l'article.
            this.memberService.create(data);
            console.log(this.memberService.members.value);
            this.dialogRef.close();
        }
        form.resetForm();
    }
}
