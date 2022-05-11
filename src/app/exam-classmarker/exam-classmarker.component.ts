import {Component, OnInit, Input, OnChanges, Inject} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ExamEmailComponent} from "../Popups/exam-email/exam-email.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-exam-classmarker',
    templateUrl: './exam-classmarker.component.html',
    styleUrls: ['./exam-classmarker.component.css']
})
export class ExamClassmarkerComponent implements OnInit, OnChanges {
    @Input() classmarkertestid: string;
    safeSrc: SafeResourceUrl;
    url: string
    private examid: string;
    constructor(private sanitizer: DomSanitizer,public dialog: MatDialog,
                private route: ActivatedRoute


    ) {
    }

    ngOnInit(): void {
        this.route.url.subscribe(x=>{
            this.examid = x[1].path
            console.log('AAAAAAAAAAAAasdasda',this.url)
        })
    }

    ngOnChanges(): void {

        this.url = "https://www.classmarker.com/online-test/start/?quiz=" + this.classmarkertestid+"&iframe=1"

        console.log(this.url);
        this.safeSrc =
            this.sanitizer.bypassSecurityTrustResourceUrl
            (this.url);
    }

    addEmail() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.data = {
           examid: this.examid,
            height: '100%',
            width: '100%'
        };
        this.dialog.open(ExamEmailComponent,dialogConfig);
    }
}
