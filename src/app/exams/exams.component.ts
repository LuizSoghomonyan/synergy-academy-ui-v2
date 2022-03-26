import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exam} from "../services/data.service";

@Component({
    selector: 'app-exams',
    templateUrl: './exams.component.html',
    styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        // console.log(this.exams)
    }

}
