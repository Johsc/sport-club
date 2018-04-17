import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';

import { ClubService } from '../club.service';
import { Club } from '../club';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
    clubs: Array<Club>;

    constructor(private clubService: ClubService, public dialog: MatDialog) {
        this.clubs = new Array<Club>();
        this.clubService.clubs.subscribe(
            (clubs: Array<Club>) => {
                this.clubs = clubs;
            }
        );
    }

    ngOnInit() {  }

    loginDialog (i: number): void {
        let dialogRef = this.dialog.open(LoginComponent, {
            width: '35%',
            data: {
                clubIndex: i
            }
        });
    }
}
