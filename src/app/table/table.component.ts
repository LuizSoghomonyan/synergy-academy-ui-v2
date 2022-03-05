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
import {ActivatedRoute, Params} from "@angular/router";


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
    @Input() datatype: string = ''
    @Input() datatypeIdForRouting: string = ''
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


    constructor(private dataService: DataService, private route: ActivatedRoute) {
        this.dataSource = new MatTableDataSource<any>()
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    refreshData() {
        if (this.datatype == 'allStudents') {

            this.displayedColumnsConfig = [
                {
                    key: 'fullname',
                    displayName: 'Full Name',
                    type: 'student'
                },
                {
                    key: 'email',
                    displayName: '@Email',
                    type: 'student'
                },
                {
                    key: 'phonenumber',
                    displayName: 'Phone',
                    type: 'student'
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
                    type: 'course'
                },
                {
                    key: 'name',
                    displayName: 'Course Name',
                    type: 'course'
                },
                {
                    key: 'yearid',
                    displayName: 'Year',
                    type: 'course'
                },
                {
                    key: 'officeid',
                    displayName: 'Office',
                    type: 'course'
                },
                {
                    key: 'startdate',
                    displayName: 'Start Date',
                    type: 'course'
                },
                {
                    key: 'enddate',
                    displayName: 'End Date',
                    type: 'course'
                }
            ];

            this.datatypeIdForRouting = 'name'


            this.dataService.getAllCourses()
                .pipe(
                    first(),
                    map((courses: Course[]) => this.dataSource.data = courses)
                )
                .subscribe()
        }
        this.displayedColumns = this.displayedColumnsConfig.map(config => config.key);
    }

//


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
