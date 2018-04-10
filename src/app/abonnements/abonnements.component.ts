import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AbonnementService } from '../abonnement.service';
import { AddAboComponentDialog } from './add-abo.component-dialog';
import { Abonnement } from '../abonnement';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.css']
})
export class AbonnementsComponent implements OnInit {
    abonnements: Array<Abonnement>;

    constructor(private aboService: AbonnementService, public dialog: MatDialog) {
        this.abonnements = new Array<Abonnement>();
        this.aboService.abonnements.subscribe(
            (abo: Array<Abonnement>) => {
                this.abonnements = abo;
            }
        );
    }

    ngOnInit() {}

    editLimitDay(abo: Abonnement, val: number) {
        if (abo.limitDay === 1 && val === -1) {
            abo.limitDay = 0;
        } else {
        abo.limitDay = abo.limitDay + val;
        }
        this.aboService.update(abo);
    }

    editLimitWeek(abo: Abonnement, val: number) {
        if (abo.limitWeek === 1 && val === -1) {
            abo.limitWeek = 0;
        } else {
        abo.limitWeek = abo.limitWeek + val;
        }
        this.aboService.update(abo);
    }

    delete(id: number) {
        this.aboService.delete(id);
    }

    addAbo(): void {
        let dialogRef = this.dialog.open(AddAboComponentDialog, {
            width: '30%',
            height: '45%',
            data: {
                abonnements: this.abonnements
            }
        }
    )};

}
