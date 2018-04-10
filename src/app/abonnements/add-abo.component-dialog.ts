import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

import { AbonnementService } from '../abonnement.service';
import { Abonnement } from '../abonnement';

import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
    selector: 'add-abo.component-dialog',
    templateUrl: './add-abo.component-dialog.html',
    styleUrls: ['./add-abo.component-dialog.css']
})
export class AddAboComponentDialog {
    abo: Abonnement;
    idCount: number;

    constructor(
        public dialogRef: MatDialogRef<AddAboComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private aboService: AbonnementService) {
            this.idCount = this.data.abonnements.length;
            this.abo = new Abonnement(this.idCount, null, 1, 2);
        }

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit(form) {
        let data = JSON.parse(JSON.stringify(this.abo));
        if (this.abo.name) {
            this.aboService.create(data);
            console.log(this.aboService.abonnements.value);
            this.dialogRef.close();
            form.resetForm();
        }
        console.log(this.aboService.abonnements.value);
    }
}
