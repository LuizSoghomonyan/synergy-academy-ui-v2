import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
    selector: 'app-allstudents',
    templateUrl: './allstudents.component.html',
    styleUrls: ['./allstudents.component.css']
})
export class AllstudentsComponent implements OnInit {
    maxId: number

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.dataService.maxId('student').subscribe(x => {
            this.maxId = x
        })
    }

}
