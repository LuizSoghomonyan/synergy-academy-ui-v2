import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {DataService, Student} from "../services/data.service";

@Component({
    selector: 'app-course-tab',
    templateUrl: './course-tab.component.html',
    styleUrls: ['./course-tab.component.css']
})
export class CourseTabComponent implements OnInit {
    coursename: string;
    isNew: false;
    constructor(private route: ActivatedRoute, private dataService: DataService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((x: Params) => {
            if(x['courseid'] == 'addCourse'){
                this.coursename = 'New Course'
            }
            else{
                //this.coursename = x['courseid']
                this.dataService.loadinfo('courses',x['courseid']).subscribe((x => {
                    // console.log('WWWWWWWWWWWWW',x)
                    this.coursename = x[0]['name']
                }))
            }

        })
        this.route.queryParams.subscribe((x: Params) =>{
            this.isNew = x['isNew']
        })
    }

}
