import {Component, ElementRef, OnInit,} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService, Student} from "../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {from, map, mergeMap, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {DataSaveSuccessfulPopupComponent} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";
import {ClassifierService} from "../services/classifier.service";

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})

export class StudentProfileComponent implements OnInit {
    isNew = false
    currentDate = new FormControl(new Date())
    universites$: Observable<string[]>;
    student$: Observable<Student>;
    form: FormGroup
    universites: string[] = [];
    student: any
    isSaveClose: boolean = false

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        public dialog: MatDialog,
        private classiferService: ClassifierService,
        private router: Router,
        private elRef: ElementRef
    ) {
    }

    dialogRef: any
    test: any;
    id: number

    ngOnInit(): void {
        this.route.queryParams.subscribe((x: Params) => {
            this.isNew = x['isNew']
            console.log(x)

        })

        if (this.isNew) {
            console.log('this.isNew')
            this.student$ = this.dataService.addNew('student')
            console.log(this.student$)
            this.student$.subscribe(x => {
                this.student = x;
            })

        } else {
            this.loadinfo();
            console.log('loadinfo')
        }

        this.loadClassifersInfo('university')

        this.form = new FormGroup({
            firstname: new FormControl('', [
                Validators.required
            ]),
            lastname: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.required, Validators.email
            ]),
            phonenumber: new FormControl('', [
                Validators.required
            ]),
            birthday: new FormControl('', [
                Validators.required
            ]),
            address: new FormControl(''),
            whatprogramminglanguagesdoyouknow: new FormControl(''),
            educationdepartmentadmissionandgraduationyear: new FormControl(''),
            othercoursesattended: new FormControl(''),
            haveyoueverparticipatedinprogramming: new FormControl(''),
            doyouhaveworkexperience: new FormControl(''),
            gpa: new FormControl('', [
                Validators.min(0)
            ]),
            universityid: new FormControl(''),
            howdidyoufindid: new FormControl('')
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
            this.student$ = this.dataService.loadinfo('students', x['id'].toString()) as Observable<Student>
            this.id = x['id']
            console.log('student$',this.student$)
        })

    }

    loadClassifersInfo(classifierName: string) {
        // @ts-ignore
        this.universites$ = this.classiferService.getClassifierData(classifierName)

    }

    onSubmit() {
        if (this.form.valid) {
            let test;
            test = this.elRef.nativeElement.querySelector('form')
            test.submit;
            console.log(this.isNew)
            if (!this.isNew) {
                this.dataService.updateDataById(this.id, 'students', this.form.value)
                    .subscribe()
            } else {
                this.dataService.addData('students', this.form.value).subscribe(x=>{
                    this.id = x['id'];
                    if(!this.isSaveClose){
                        this.router.navigate(['students', this.id])
                    }

                })
            }

        } else {
            console.log('------------', this.form)
            console.log('VALID DATA, NOT SUBMITTED')
            console.log('lastname', this.form.controls['lastname'])
        }
    }

    openDialog(buttontype: string) {
        if (buttontype == 'save') {
            //if()
            if (this.form.invalid) {
                console.log(this.dialog)
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
            }
            // [routerLink]="['/students']"
            // this.router.navigate(['/students'])
        }

        if (buttontype == 'save&close') {
            this.isSaveClose = true;
            let test;
            if (this.form.invalid) {
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
                this.onSubmit()
                if (this.form.valid)
                    console.log('URLURLLLLL',this.router.url)
                    this.router.navigate(['/students'])

            }

        }

        if (buttontype == 'reset') {
            this.dialogRef = this.dialog.open(ResetPopupComponent);
            // @ts-ignore
            this.dialogRef.afterClosed().subscribe(result => {
                if (this.dialogRef.componentInstance.isReset)
                    this.form.reset();
            });

        }


    }

    getUniversity() {
        console.log(this.universites)
    }


}
