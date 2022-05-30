import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService, Exam} from "../services/data.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {
    DataSaveSuccessfulPopupComponent
} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ClassifierService} from "../services/classifier.service";

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
    form: FormGroup
    isSaveClose: boolean = false
    dialogRef: any
    courseid: number;
    @Output() classmarkertest: EventEmitter<string> = new EventEmitter<string>()


    constructor(private dataService: DataService, private route: ActivatedRoute,
                public dialog: MatDialog,
                private classiferService: ClassifierService,
                private router: Router,
                private elRef: ElementRef) {
        this.form = new FormGroup({
            examtypeid: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            startdate: new FormControl('', Validators.required),
            enddate: new FormControl('', Validators.required),
            classmarkertestid: new FormControl('', Validators.required)

        })
    }

    ngOnInit(): void {
        this.initializeParams();
        if (this.isNew) {
            this.exams$ = this.dataService.addNew('exam')
        } else {
            this.exams$ = this.dataService.loadinfo('exams', this.examid.toString())
        }

        this.test()
    }

    initializeParams() {
        this.route.params.subscribe((x: Params) => {
            this.examid = x['examid']
        });

        this.route.queryParams.subscribe((x: Params) => {
            this.isNew = x['isNew']
        })
    }

    onSubmit() {
        if (this.form.valid) {
            console.log('exam submit')
            this.classmarkertest.emit(this.form.value['classmarkertestid'])
            if (!this.isNew) {
                console.log('old exam')
                this.dataService.updateDataById(this.examid, 'exams', this.form.value).subscribe()
            } else {
                console.log('new exam')
                this.route.params.subscribe((params: Params) => {
                    this.courseid = params['courseid']
                    this.dataService.addData('exams', this.form.value, this.courseid).subscribe(x => {
                        this.examid = x['id']

                        if (!this.isSaveClose)
                            this.router.navigate(['exams', this.examid])
                    })
                })

            }

        } else
            console.log('not valid')
    }

    openDialog(buttontype: string) {
        if (buttontype == 'save') {
            //if()
            if (this.form.invalid) {
                // console.log(this.dialog)
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
            }
            // [routerLink]="['/students']"
            // this.router.navigate(['/students'])
        }

        if (buttontype == 'save&close') {
            this.isSaveClose = true;
            if (this.form.invalid) {
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
                this.onSubmit()
                if (this.form.valid) {
                    ///courses/1676/exams/addExam?isNew=true
                    // console.log('URL',this.router.url)
                    this.router.navigate(['/courses'])
                }


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

    test() {
        this.exams$.subscribe(x=>{
            this.classmarkertest.emit(x[0].classmarkertestid)
        })

    }
}
