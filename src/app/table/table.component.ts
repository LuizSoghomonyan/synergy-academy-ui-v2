import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Course, Student, DataService} from "../services/data.service";
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

    // @ts-ignore
    displayedColumnsConfig: {
        key: string,
        displayName: string,
        type: string
    }[]
    displayedColumns: string[] = []
    private destroy$: Subject<boolean> = new Subject();

    constructor(private dataService: DataService, private route: ActivatedRoute,public datepipe: DatePipe) {
        this.dataSource = new MatTableDataSource<any>()
        this.datepipe = new DatePipe('en-US')

    }

    ngOnInit() {
        this.refreshData();
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


    refreshData() {
        if (this.datatype == 'allStudents') {

            this.displayedColumnsConfig = [
                {
                    key: 'fullname',
                    displayName: 'Full Name',
                    type: 'students'
                },
                {
                    key: 'email',
                    displayName: '@Email',
                    type: 'students'
                },
                {
                    key: 'phonenumber',
                    displayName: 'Phone',
                    type: 'students'
                }
            ];


            this.datatypeIdForRouting = 'studentid'

            this.dataService.getAllStudents()
                .pipe(
                    first(),
                    map((students: Student[]) => this.dataSource.data = students)
                    // , takeUntil(this.destroy$)
                )
                .subscribe();
        }

        if (this.datatype == 'allCourses') {
            this.displayedColumnsConfig = [
                {
                    key: 'courseid',
                    displayName: 'Course ID',
                    type: 'courses'
                },
                {
                    key: 'name',
                    displayName: 'Course Name',
                    type: 'courses'
                },
                {
                    key: 'yearid',
                    displayName: 'Year',
                    type: 'courses'
                },
                {
                    key: 'officeid',
                    displayName: 'Office',
                    type: 'course'
                },
                {
                    key: 'startdate',
                    displayName: 'Start Date',
                    type: 'courses'
                },
                {
                    key: 'enddate',
                    displayName: 'End Date',
                    type: 'courses'
                }
            ];

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
        this.displayedColumns = this.displayedColumnsConfig.map(config => config.key);
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
