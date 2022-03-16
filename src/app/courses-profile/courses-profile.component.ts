import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentProfilePopupComponent} from "../Popups/student-profile-popup/student-profile-popup.component";
import {
    DataSaveSuccessfulPopupComponent
} from "../Popups/data-save-successful-popup/data-save-successful-popup.component";
import {ResetPopupComponent} from "../Popups/reset-popup/reset-popup.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {ClassifierService} from "../services/classifier.service";

@Component({
    selector: 'app-courses-profile',
    templateUrl: './courses-profile.component.html',
    styleUrls: ['./courses-profile.component.css']
})
export class CoursesProfileComponent implements OnInit {
    @Input() courseName: string
    form: FormGroup
    dialogRef: any
    constructor( private route: ActivatedRoute,
                 private dataService: DataService,
                 public dialog: MatDialog,
                 private classiferService: ClassifierService,
                 public router: Router,
                 private elRef: ElementRef) {
        this.form = new FormGroup({
            name: new FormControl('',[
                Validators.required
            ]),
            yearid: new FormControl('',[
                Validators.required
            ]),
            officeid: new FormControl('')
        })
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if(this.form.valid)
            console.log('submit')
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
            let test;
            if (this.form.invalid) {
                this.dialog.open(StudentProfilePopupComponent);
            } else {
                this.dialog.open(DataSaveSuccessfulPopupComponent);
                this.onSubmit()
                if (this.form.valid)
                    this.router.navigate(['/courses'])

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

    menuNavigate(type: string) {
        var re = /info/gi;
        var newstr = this.router.url.replace(re, type);
        this.router.navigate([newstr])
        console.log(newstr)
    }
}
