import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Course, Student, DataService, Config} from "../services/data.service";
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
import {ActivatedRoute, Event, Params} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
    @Input() datatype: string = ''
    datatypeIdForRouting: string = ''
    // @ts-ignore
    dataSource: MatTableDataSource<any>;
    displayedColumnsConfig$: Observable<any>
    // @ts-ignore
    displayedColumnsConfig: Config[]
    displayedColumns: string[] = []
    private destroy$: Subject<boolean> = new Subject();
    config: Config
    constructor(private dataService: DataService, private route: ActivatedRoute,public datepipe: DatePipe) {
        this.dataSource = new MatTableDataSource<any>()
        this.datepipe = new DatePipe('en-US')

    }

    ngOnInit() {
        this.refreshData();
        console.log('test')
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort = new MatSort();
    // @ts-ignore
    @ViewChild(MatTable) matTable: MatTable<any>;

    ngAfterViewInit(): void {
        console.log('after view Init')
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
        console.log('this.datatype',this.datatype)

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
                .subscribe();
        }

        if (this.datatype == 'allCourses') {
            this.displayedColumnsConfig$ = this.dataService.getConfigs('courses');
            this.displayedColumnsConfig$.subscribe(x =>{
                this.config = x
                console.log('this.config',this.config)
                this.displayedColumnsConfig = x;
                console.log('displayedColumnsConfig',this.displayedColumnsConfig)
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
                        console.log( )
                       this.dataSource.data.forEach((value) => {
                           value['startdate'] = this.datepipe.transform(value['startdate'], 'mediumDate')
                           value['enddate'] = this.datepipe.transform(value['enddate'], 'mediumDate')
                       })
                    }
                )
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


}


/*
*
*   key display  module
*   a     b       student
*
*
*
*
*
* */
