import {Component, Input, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DataService, Student} from "../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {
    DataSaveSuccessfulPopupComponent
} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";

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

    constructor(private route: ActivatedRoute, private dataService: DataService,public dialog: MatDialog) {}
    dialogRef: any

    ngOnInit(): void {
        this.loadinfo();

        this.form = new FormGroup(  {
            firstname: new FormControl('', [
                Validators.required
            ]),
            lastname: new FormControl('',[
                Validators.required
            ]),
            email: new FormControl('',[
                Validators.required, Validators.email
                ]),
            phonenumber: new FormControl('',[
                Validators.required
            ]),
            birthday: new FormControl(''),
            address: new FormControl(''),
            whatprogramminglanguagesdoyouknow: new FormControl(''),
            educationdepartmentadmissionandgraduationyear: new FormControl(''),
            othercoursesattended: new FormControl(''),
            haveyoueverparticipatedinprogramming: new FormControl(''),
            doyouhaveworkexperience: new FormControl(''),
            gpa: new FormControl('')
        });
        //console.log('this.form.controls[\'firstname\']',this.form.controls['firstname'])

    }

    loadinfo() {
        this.route.params.subscribe((x: Params) => {
            this.student$ =  this.dataService.loadinfo('student', x['id'].toString()) as Observable<Student>
            // console.log(this.student$.subscribe(x=> console.log(x.birthday.toDateString())))
        })

    }

    loadClassifersInfo(){}


    onSubmit() {
        //TODO
        console.log('submit', this.form)
    }

    openDialog(buttontype: string) {
        if(buttontype == 'save')
        {
            if(this.form.invalid)
            {
                this.dialog.open(StudentProfilePopupComponent);
            }

            else{
                this.dialog.open(DataSaveSuccessfulPopupComponent);
            }
        }

        if(buttontype == 'reset'){
            this.dialogRef =  this.dialog.open(ResetPopupComponent);
            console.log('this.dialogRef.componentInstance',this.dialogRef.componentInstance)
            // @ts-ignore
            this. dialogRef.afterClosed().subscribe(result => {
                if(this.dialogRef.componentInstance.isReset)
                    this.form.reset();
            });

        }


    }
}
