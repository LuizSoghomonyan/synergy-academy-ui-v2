import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DataService, Student} from "../services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

    universites = [5, 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D']
    currentDate =  new FormControl(new Date())
    howdidyoufind = [1,2,3,4,5,6,7,8,9,10,11,12,13]


    student$: Observable<Student> ;
    form: FormGroup

    constructor(private route: ActivatedRoute, private dataService: DataService) {}


    ngOnInit(): void {
        this.loadinfo();

        this.form = new FormGroup(  {
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            fullname: new FormControl(''),
            email: new FormControl(''),
            phonenumber: new FormControl(''),
            birthday: new FormControl('')
        });
        //console.log('this.form.controls[\'firstname\']',this.form.controls['firstname'])

    }

    loadinfo() {
        this.route.params.subscribe((x: Params) => {
            this.student$ =  this.dataService.loadinfo('student', x['id'].toString()) as Observable<Student>
        })

    }

    loadClassifersInfo(){

    }


    onSubmit() {
        //TODO
        console.log('submit', this.form)
    }

}
