import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {
    Course,
    Student,
    DataService,
    Config,
    Exam,
    ExamStudentResult,
    EducationProcess, EducationProcessGradesAndFeedbacks
} from "../services/data.service";
import {
    delay,
    first,
    from,
    interval,
    map,
    mergeAll,
    mergeMap,
    Observable,
    of,
    Subject,
    take, takeLast,
    takeUntil,
    tap
} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Event, Params, Router} from "@angular/router";
import { DatePipe } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {ExamResultsPopupComponent} from "../exam-results-popup/exam-results-popup.component";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
    @Input() datatype: string = ''
    @Output() examsOutput: EventEmitter<Exam[]> = new EventEmitter<Exam[]>()
    datatypeIdForRouting: string = ''
    // @ts-ignore
    dataSource: MatTableDataSource<any>;
    displayedColumnsConfig$: Observable<any>
    // @ts-ignore
    displayedColumnsConfig: Config[]
    displayedColumns: string[] = []
    private destroy$: Subject<boolean> = new Subject();
    config: Config
    exams: Exam[]
    constructor(private dataService: DataService,
                private route: ActivatedRoute,
                public datepipe: DatePipe,
                private router: Router,
                public dialog: MatDialog,
    ) {
        this.dataSource = new MatTableDataSource<any>()
        this.datepipe = new DatePipe('en-US')

    }

    ngOnInit() {
        this.refreshData();
        // console.log('test')
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort = new MatSort();
    // @ts-ignore
    @ViewChild(MatTable) matTable: MatTable<any>;

    ngAfterViewInit(): void {
        // console.log('after view Init')
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.refreshData();
    }

    sortingConfigs = function (config1: Config, config2: Config) {
        if (config1.orderid > config2.orderid) { return 1; }
        if (config1.orderid < config2.orderid) {return -1; }
        return 0;
    }

    refreshData() {
        // console.log('this.datatype',this.datatype)

        if (this.datatype == 'allStudents') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('students');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'studentid'
            this.dataService.getAllStudents()
                .pipe(
                    first(),
                    map((students: Student[]) => this.dataSource.data = students)
                )
                .subscribe(x => console.log('zQWERTYUI'));
        }

        if (this.datatype == 'allCourses') {
            this.displayedColumnsConfig$ = this.dataService.getConfigs('courses');
            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                // console.log('this.config',this.config)
                this.displayedColumnsConfig = x;
                // console.log('displayedColumnsConfig',this.displayedColumnsConfig)
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'courseid'


            this.dataService.getAllCourses()
                .pipe(
                    first(),
                    map((courses: Course[]) => {
                        this.dataSource.data = courses
                    })
                )
                .subscribe(x =>{
                        console.log( 'ASDFGHJKXCVBN')
                       this.dataSource.data.forEach((value) => {
                           value['startdate'] = this.datepipe.transform(value['startdate'], 'mediumDate')
                           value['enddate'] = this.datepipe.transform(value['enddate'], 'mediumDate')
                       })
                    }
                )
        }
        if (this.datatype == 'allExams') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('exams');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'courseexamid'
            this.route.params.subscribe((x:Params) =>{
                this.dataService.getExams(x['courseid'])
                    .pipe(
                        first(),
                        map((exams: Exam[]) => this.dataSource.data = exams)
                    )
                    .subscribe(x =>{
                        console.log('POIUYTR(*&^%$#@')
                        this.dataSource.data.forEach((value) => {
                            value['startdate'] = this.datepipe.transform(value['startdate'], 'mediumDate')
                            value['enddate'] = this.datepipe.transform(value['enddate'], 'mediumDate')
                        })
                        this.exams = x
                        console.log(this.exams)
                        this.examsOutput.emit(this.exams)
                    });
            })

        }
        //courseStudents
        if (this.datatype == 'allExamStudents') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('students');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'studentid'
            this.route.url.subscribe(x=> {
                this.dataService.getStudentsByExamId(<number><unknown>(x[1].path))
                    .pipe(
                        first(),
                        map((students: Student[]) => this.dataSource.data = students)
                    )
                    .subscribe(x => console.log('zQWERTYUI'));
            })


        }
        if (this.datatype == 'allExamStudentsResults') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('examstudnetsresults');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'studentid'
            this.route.url.subscribe(x=> {
                this.dataService.getStudentsResultsByExamId(<number><unknown>(x[1].path))
                    .pipe(
                        first(),
                        map((examStudentResult: ExamStudentResult[]) => this.dataSource.data = examStudentResult)
                    )
                    .subscribe(x => console.log('zQWERTYUI'));
            })


        }
        //courseStudents
        if (this.datatype == 'courseStudents') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('students');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'studentid'
            this.route.url.subscribe(x=> {
                this.dataService.getStudentsByCourseId(<number><unknown>(x[1].path))
                    .pipe(
                        first(),
                        map((students: Student[]) => this.dataSource.data = students)
                    )
                    .subscribe(x => console.log('zQWERTYUI'));
            })


        }
        //todo - educationProcess

        if (this.datatype == 'educationProcess') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('educationprocess');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })
            this.datatypeIdForRouting = 'courseeducationprocessid'
            this.route.url.subscribe(x=> {
                this.dataService.getEducationProcess(<number><unknown>(x[1].path))
                    .pipe(
                        first(),
                        map((educationProcess: EducationProcess[]) => this.dataSource.data = educationProcess)
                    )
                    .subscribe();
            })


        }
        //educationProcessGradesAndFeedbacks
        if (this.datatype == 'educationprocessgrades') {

            this.displayedColumnsConfig$ = this.dataService.getConfigs('educationprocessgrades');

            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                this.displayedColumnsConfig = x //this.displayedColumnsConfig.push(x);
                this.displayedColumns = this.displayedColumnsConfig.sort(this.sortingConfigs).map(config => config._key);

            })

            this.route.url.subscribe(x=> {
                this.dataService.getEducationProcessGradesAndFeedbacks(<number><unknown>(x[1].path))
                    .pipe(
                        first(),
                        map((educationProcessGradesAndFeedbacks: EducationProcessGradesAndFeedbacks[]) => this.dataSource.data = educationProcessGradesAndFeedbacks)
                    )
                    .subscribe(x => console.log(x));
            })


        }

    }


    applyFilter(event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }


    routerLinkForRows(type: any, id: number) {
        //[routerLink]="['/',col['type'],element[datatypeIdForRouting]]"
        if(type == 'examstudnetsresults'){
            console.log('ID', id)
            this.dialog.open(ExamResultsPopupComponent, {
                width: '500',
                height: '500',
                data: {
                    dataKey: this.dataSource.data.filter(x => {
                        return x['studentid'] == id;
                    })
                }
            })
        }
        else{
            this.router.navigate(['/', type, id])
        }
    }
}

