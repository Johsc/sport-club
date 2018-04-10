import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
    id: number;
    path: string;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        ) {
            this.id = +this.route.snapshot.paramMap.get('id');
            this.path = location.path();
    }

    ngOnInit() {
        this.displayMenu();
    }

    displayMenu() {
      return true;
    }
}
