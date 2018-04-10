import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

import { Member } from '../member';
import { Activity } from '../activity';
import { Creneau } from '../creneau';
import { MemberService } from '../member.service';
import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
    selector: 'creneau.component-dialog',
    templateUrl: 'creneau.component-dialog.html',
    styleUrls: ['./creneau.component-dialog.css']
})
export class CreneauComponentDialog {
    members = new FormControl();
    counter: number;
    messageLimit: string;
    full: boolean;
    message1: string;

    constructor(
        public dialogRef: MatDialogRef<CreneauComponentDialog>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private memberService: MemberService) {
            console.log(this.data.creneau);
            this.counter = this.data.creneau.limitCreneau - this.data.creneau.registred.length;
            this.checklimitCreneau(this.counter);
            console.log(this.memberService.members.value);
        }

    onNoClick(): void {
        this.dialogRef.close();

    }

    checkLimit(member: Member) {
        let creneauInscr = this.data.creneau.registred;
        let currentDay = this.data.creneau.date;
        let result = false;

        // Limite d'inscription du créneau
        for (let i = 0; i < creneauInscr.length; ++i) {
            if (creneauInscr[i].id === member.id) {
                this.message1 = "Membre déjà inscrit";
                result = true;
                return result;
            }
        }

        // Limite quotidienne de l'abonnement du joueur
        if (this.checkLimitDay(member, currentDay)) {
            return true;
        }

        // Limite hebdommadaire de l'abonnement du joueur
        if (this.checkLimitWeek(member, currentDay)) {
            return true;
        }

    }

    checkLimitDay(member: Member, currentDay: any) {
        let dayInscr = [];
        for (let i = 0; i < member.inscriptions.length; ++i) {
            if(member.inscriptions[i].date == currentDay) {
                dayInscr.push(member.inscriptions[i].hDebut);
            }
            if (dayInscr.length >= member.abonnement.limitDay) {
                this.message1 = "Limite abonnement";
                return true;
            }
        }
    }

    checkLimitWeek(member: Member, currentDay: any) {
        let weekInscr= [];
        for (let i = 0; i < member.inscriptions.length; ++i) {
            for (let j = 1; j < 8; ++j) {
                if (member.inscriptions[i].date == moment(this.data.dayshift.date, "dddd D MMMM").isoWeekday(j).format('dddd D MMMM')) {
                    weekInscr.push(moment(this.data.dayshift.date, "dddd D MMMM").isoWeekday(j).format('dddd D MMMM'));
                }
            }
            if (weekInscr.length >= member.abonnement.limitWeek) {
                this.message1 = "Limite abonnement";
                return true;
            }
        }
    }

    checklimitCreneau(counter: number) {
        if (counter == 0) {
            this.messageLimit = "Complet !";
            this.full = true;
        } else if (counter < 0 ) {
            this.messageLimit = `${-this.counter} membre(s) en trop !`
            this.full = true;

        } else {
            this.messageLimit = `Encore ${this.counter} place(s) disponible(s)`;
            this.full = false;
        }
    }

    inscription() {
        for(let member of this.members.value) {
            this.data.creneau.registred.push(member);
            member.inscriptions.push(this.data.creneau);
        }
        // this.data.creneau.registred.push.apply(this.data.creneau.registred, this.members.value);
        this.counter = this.data.creneau.limitCreneau - this.data.creneau.registred.length;
        this.checklimitCreneau(this.counter);
        this.members = new FormControl();
    }

    delete(member: Member) {
        console.log('Suppression du membre :', member);
        let index = this.data.creneau.registred.findIndex(
            (m: Member) => m.id === member.id);
        if (index >= 0) {
            this.data.creneau.registred.splice(index, 1);
        }
        this.memberService.deleteInscr(member.id, this.data.creneau.id);
        this.counter = this.data.creneau.limitCreneau - this.data.creneau.registred.length;
        this.checklimitCreneau(this.counter);
    }

    deleteCreneau() {
        let creneau = this.data.creneau;
        // Supprime les inscriptions des membres inscrits dans le créneau
        for (let i = 0; i < creneau.registred.length; ++i) {
            this.memberService.deleteInscr(creneau.registred[i].id, creneau.id);
        }
        //Supprime le créneau dans la dayshift du jour
        let index = this.data.hourIndex;
        if (index >= 0) {
            this.data.dayshift.creneaux.splice(index, 1, null);
        }
        // Supprime le créneau dans la liste globale
        this.memberService.removeCourse(creneau.id);
        // Ferme la pop-up
        this.dialogRef.close();
    }
}
