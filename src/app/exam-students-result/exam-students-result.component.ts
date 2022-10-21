import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
    selector: 'app-exam-students-result',
    templateUrl: './exam-students-result.component.html',
    styleUrls: ['./exam-students-result.component.css']
})
export class ExamStudentsResultComponent implements OnInit {

    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }



    tableApp: string = 'allExamStudentsResults';

    refresh() {

    }
}
