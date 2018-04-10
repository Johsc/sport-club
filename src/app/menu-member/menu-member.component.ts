import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-member',
  templateUrl: './menu-member.component.html',
  styleUrls: ['./menu-member.component.css']
})
export class MenuMemberComponent implements OnInit {
    id: number;
    on: boolean = true;

    constructor(private route: ActivatedRoute) {
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
    }

}
