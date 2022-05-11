import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-exam-students',
    templateUrl: './exam-students.component.html',
    styleUrls: ['./exam-students.component.css']
})
export class ExamStudentsComponent implements OnInit {
    @Input() forRouting: string

    constructor() {
    }

    ngOnInit(): void {
    }

}
