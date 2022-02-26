import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
    @Input() titleName = "Students"
    @Input() icon: string = 'AllCourses'

    constructor() {
    }

    ngOnInit(): void {
    }

}
