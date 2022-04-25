import {Component, ElementRef, OnInit} from '@angular/core';
import {DataService, EducationProcess, Exam} from "../services/data.service";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ClassifierService} from "../services/classifier.service";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {
    DataSaveSuccessfulPopupComponent
} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";

@Component({
  selector: 'app-educationprocess-profile',
  templateUrl: './educationprocess-profile.component.html',
  styleUrls: ['./educationprocess-profile.component.css']
})
export class EducationprocessProfileComponent implements OnInit {
    exam: EducationProcess;
    isNew: false;
    educationProcessid: number;
    educationProcess$: Observable<EducationProcess[]>
    form: FormGroup
    isSaveClose: boolean = false
    dialogRef: any
    courseid: number;


    constructor(private dataService: DataService, private route: ActivatedRoute,
                public dialog: MatDialog,
                private classiferService: ClassifierService,
                private router: Router,
                private elRef: ElementRef) {
        this.form = new FormGroup({
            enddate : new FormControl('',Validators.required),
            startdate : new FormControl('',Validators.required),
            subjectid: new FormControl('',Validators.required),
            lecturerid: new FormControl('',Validators.required)


        })
    }

    ngOnInit(): void {
        this.initializeParams();
        if(this.isNew){
            this.educationProcess$ = this.dataService.addNew('educationprocess')
        }
        else{
            this.educationProcess$ = this.dataService.loadinfo('educationprocess', this.educationProcessid.toString())
        }
    }

    initializeParams(){
        this.route.params.subscribe((x: Params) =>{
            this.educationProcessid = x['educationProcessid']
            console.log( 'AAAAAAAAAA',x)
        });

        this.route.queryParams.subscribe((x: Params)=>{
            this.isNew = x['isNew']
        })
    }

    onSubmit() {
        if(this.form.valid){
            console.log('exam submit')
            if(!this.isNew){
                this.dataService.updateDataById(this.educationProcessid,'educationProcess', this.form.value).subscribe()
            }
            else{
                console.log('new exam')
                this.route.params.subscribe((params: Params) =>{
                    this.courseid = params['courseid']
                    // console.log('ASDFGHJASDFGHJK@#$%^&*', params)
                    this.dataService.addData('exams', this.form.value, this.courseid).subscribe(x => {
                        this.educationProcessid = x['id']

                        if(!this.isSaveClose)
                            this.router.navigate(['exams', this.educationProcessid])
                    })
                })

            }

        }

        else
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
                if (this.form.valid){
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

}
