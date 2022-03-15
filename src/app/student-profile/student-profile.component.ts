import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
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
    isNew = false
    currentDate = new FormControl(new Date())
    universites$: Observable<string[]>;
    student$: Observable<Student>;
    form: FormGroup
    universites: string[] = [];
    student: any

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
            gpa: new FormControl(''),
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
        })

    }

    loadClassifersInfo(classifierName: string) {
        // @ts-ignore
        this.universites$ = this.classiferService.getClassifierData(classifierName)

    }

    onSubmit() {
        if (this.form.valid) {
            let test;
            //TODO
            console.log('onSubmit()', this.form)
            test = this.elRef.nativeElement.querySelector('form')
            test.submit;

            if (!this.isNew) {
                this.dataService.updateDataById(this.id, 'students', this.form.value)
                    .subscribe(msg => {
                        console.log(msg)
                    })
            } else {
                this.dataService.addData('students', this.form.value).subscribe(x=>{
                    console.log(x)
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
            let test;
            if (this.form.invalid) {
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
                this.onSubmit()
                if (this.form.valid)
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
