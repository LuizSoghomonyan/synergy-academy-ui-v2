import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {first, map, Observable} from "rxjs";
import {Config, DataService, Exam, Student} from "../../services/data.service";
import {MatTableDataSource} from "@angular/material/table";
import {ExamResultsPopupComponent} from "../../exam-results-popup/exam-results-popup.component";
import {nullSafeIsEquivalent} from "@angular/compiler/src/output/output_ast";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
    selector: 'app-exam-email',
    templateUrl: './exam-email.component.html',
    styleUrls: ['./exam-email.component.css']
})
export class ExamEmailComponent implements OnInit {
    @Input() url: string
    examid: any
    dataSource: MatTableDataSource<any>;
    displayedColumnsConfig$: Observable<any>
    displayedColumnsConfig: Config[]
    displayedColumns: string[] = []
    config: Config
    exams: Exam[]

    dataSource$: Observable<any>
    dataSourceWithCheckbox:Student[] = []
    arrayForBackend: string[] = []

    constructor(
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<ExamEmailComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private dataService: DataService,
        private router: Router
    ) {
        this.examid = data.examid
        this.dataSource = new MatTableDataSource<any>()
    }

    sortingConfigs = function (config1: Config, config2: Config) {
        if (config1.orderid > config2.orderid) {
            return 1;
        }
        if (config1.orderid < config2.orderid) {
            return -1;
        }
        return 0;
    }
    checkedAll: boolean = false;
    tt:boolean = false;
    viewProgressBar: boolean;
    ngOnInit(): void {
        this.displayedColumnsConfig$ = this.dataService.getConfigs('students_checkbox');

        this.displayedColumnsConfig$.subscribe(x =>{
            this.config = x
            this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
            this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);
            console.log('B BBBBBBBBBBBB', this.displayedColumns)
            // this.displayedColumns.push('checkbox')

            this.dataSource$ = this.dataService.getStudentsByExamId(this.examid)
                .pipe(
                    first(),
                    map((students: Student[]) => {
                            this.dataSource.data = students
                            this.dataSourceWithCheckbox =
                                students.map(student => Object.assign({}, student));
                            console.log('dataSourseWithCheckbox', this.dataSourceWithCheckbox)
                            for (let student of this.dataSourceWithCheckbox) {
                                (student as Student).checkbox = false;
                            }

                            console.log(this.dataSource.data)
                        }
                    )
                )

            this.dataSource$.subscribe()
        })



        // this.dataSource$.subscribe()



    }


    sendEmails() {
        this.viewProgressBar = true;
        if(this.checkedAll){
            this.dataSourceWithCheckbox.forEach(x => {
                x.checkbox = true
            })
            console.log('after checkedAll',this.dataSourceWithCheckbox)
        }
        this.createArrayForBackend();
        console.log('after createArrayForBackend', this.arrayForBackend)
        console.log('after dataSourceWithCheckbox', this.dataSourceWithCheckbox)
        if(this.arrayForBackend.length > 0) {
            //todo call to back
            this.dataService.postEmailsForClassMarker(this.arrayForBackend)
            setTimeout(() => {
                this.viewProgressBar = false
                this.dialogRef.close()
            }, 2500)

        }
        else
            this.dialogRef.close()
    }

    createArrayForBackend(){
        this.arrayForBackend = []
        this.dataSourceWithCheckbox.forEach(x => {
            if(x.checkbox){
                this.arrayForBackend.push(x.email)
            }

        })
    }

    test(event: MatCheckboxChange, elem:any) {

        console.log("event",event.checked)
        this.dataSourceWithCheckbox.forEach(x => {
            if(x.email == elem.email)
                x.checkbox = event.checked;
        })

        console.log('ASASDA',this.dataSourceWithCheckbox)
    }

    updateAllCheckboxesToFalse() {
        this.dataSourceWithCheckbox.forEach(x => {
                x.checkbox = false;
        })
        console.log('updateAllCheckboxesToFalse', this.dataSourceWithCheckbox)
    }
}

//
//
// if (this.datatype == 'allExamStudents') {
//
//     this.displayedColumnsConfig$ = this.dataService.getConfigs('students');
//
//     this.displayedColumnsConfig$.subscribe(x =>{
//         this.config = x
//         this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
//         this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);
//
//     })
//     if(this.forRouting){
//         this.dataService.getStudentsByExamId(this.forRouting)
//             .pipe(
//                 first(),
//                 map((students: Student[]) => this.dataSource.data = students)
//             )
//             .subscribe(x => console.log('zQWERTYUI'));
//     }
//     else{
//         this.datatypeIdForRouting = 'studentid'
//         this.route.url.subscribe(x=> {
//             this.dataService.getStudentsByExamId(<number><unknown>(x[1].path))
//                 .pipe(
//                     first(),
//                     map((students: Student[]) => this.dataSource.data = students)
//                 )
//                 .subscribe(x =>  console.log('a'))
//         })
//     }
//
//
//
// }
