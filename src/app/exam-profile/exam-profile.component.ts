import {Component, OnInit} from '@angular/core';
import {DataService, Exam} from "../services/data.service";
import {ActivatedRoute, Params, Route} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'app-exam-profile',
    templateUrl: './exam-profile.component.html',
    styleUrls: ['./exam-profile.component.css']
})
export class ExamProfileComponent implements OnInit {
    exam: Exam;
    isNew: false;
    examid: number;
    exams$: Observable<Exam[]>
    constructor(private dataService: DataService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((x: Params) => {
            this.isNew = x['isNew']
            // console.log('xxxxxxxxxxxx',x)
        })
        this.route.params.subscribe((x: Params) => {
            this.examid = x['examid']
            // console.log('eeeeeeeeeee',x)
        })
        if(this.isNew){
            // this.exam = this.dataService.getExams()
            this.dataService.addNew('exam').subscribe(x=>console.log(x))
        }
        else{
            this.exams$ = this.dataService.loadinfo('exams', this.examid.toString()) as Observable<Exam[]>
        }

    }



}
