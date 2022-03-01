import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DataService, Student} from "../services/data.service";

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
    // @ts-ignore
    encapsulation: ViewEncapsulation.None
    // @ts-ignore
    student: Student = {};
    constructor(private route: ActivatedRoute, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.loadinfo();
        // @ts-ignore
        //   console.log(this.route.params['id'])
    }

    loadinfo() {
        this.route.params.subscribe((x: Params) => {
            this.dataService.loadinfo('student', x['id'].toString()).subscribe((x => {
                this.student = x as Student
                console.log(this.student)
            }))
        })

    }

}
