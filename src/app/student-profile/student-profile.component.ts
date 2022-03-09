import {Component, ElementRef, Input, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Course, DataService, Student} from "../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first, from, map, mergeMap, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {
    DataSaveSuccessfulPopupComponent
} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";
import {ClassifierService} from "../services/classifier.service";

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

    // universites = [5, 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D','A', 'B', 'C', 'D']
    currentDate =  new FormControl(new Date())
    howdidyoufind = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    universites$: Observable<string[]>;
    student$: Observable<Student> ;
    form: FormGroup
    universites: string[] = [];
    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        public dialog: MatDialog,
        private classiferService: ClassifierService,
        private router: Router,
        private elRef: ElementRef
    ) {}
    dialogRef: any
    test: any;

    ngOnInit(): void {
        this.loadinfo();
        this.loadClassifersInfo('university')

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
            gpa: new FormControl(''),
            university: new FormControl(''),
            howdidyoufind: new FormControl('')
        });

        this.universites$.pipe(
            // @ts-ignore
            mergeMap(x => from(x)),
            map(classifierItem => {
                // @ts-ignore
                this.universites.push(classifierItem['name'])
            })
        ).subscribe()

    }


    loadinfo() {
        this.route.params.subscribe((x: Params) => {
            this.student$ =  this.dataService.loadinfo('student', x['id'].toString()) as Observable<Student>

        })

    }

    loadClassifersInfo(classifierName: string){
       // @ts-ignore
        this.universites$ = this.classiferService.getClassifierData(classifierName)

    }

    onSubmit() {
        if(this.form.valid) {
            let test;
            //TODO
            console.log('onSubmit()', this.form)
            test = this.elRef.nativeElement.querySelector('form')
            // console.log('test',this.elRef.nativeElement.querySelector('form'))
            test.submit;
            console.log('onSubmit()', this.form.controls)
            this.dataService.updateDataById(this.form.controls['id'].value, 'student')
        }
        else{
            console.log('VALID DATA, NOT SUBMITTED')

        }
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
            // [routerLink]="['/students']"
            // this.router.navigate(['/students'])
        }

        if(buttontype == 'save&close')
        {
            let test;
            if(this.form.invalid)
            {
                this.dialog.open(StudentProfilePopupComponent);
            }

            else{
                this.dialog.open(DataSaveSuccessfulPopupComponent);
                this.onSubmit()
                if(this.form.valid)
                    this.router.navigate(['/students'])
            }

        }

        if(buttontype == 'reset'){
            this.dialogRef =  this.dialog.open(ResetPopupComponent);
            // @ts-ignore
            this. dialogRef.afterClosed().subscribe(result => {
                if(this.dialogRef.componentInstance.isReset)
                    this.form.reset();
            });

        }


    }

    getUniversity(){
        console.log(this.universites)
    }


}
