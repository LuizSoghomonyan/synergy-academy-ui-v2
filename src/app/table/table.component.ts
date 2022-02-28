import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Course,Student, DataService} from "../services/data.service";
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


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit{
   @Input() datatype: string = ''
    // @ts-ignore
    dataSource: MatTableDataSource<any>;

    // @ts-ignore
    displayedColumnsConfig:{
        key: string,
        displayName: string
    }[]
    displayedColumns: string[] = []


    constructor(private dataService: DataService) {
        this.dataSource = new MatTableDataSource<any>()
    }

    ngOnInit() {
        this.refreshData()
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
                    displayName: 'Full Name'
                },
                {
                    key: 'email',
                    displayName: '@Email'
                },
                {
                    key: 'phonenumber',
                    displayName: 'Phone'
                }
            ];



            this.dataService.getAllStudents()
                .pipe(
                    first(),
                    map((students: Student[]) => this.dataSource.data = students)
                    // , takeUntil(this.destroy$)
                )
                .subscribe();
        }

        if(this.datatype == 'allCourses'){
           this.displayedColumnsConfig = [
                {
                    key: 'courseid',
                    displayName: 'Course ID'
                },
                {
                    key: 'name',
                    displayName: 'Course Name'
                },
                {
                    key: 'yearid',
                    displayName: 'Year'
                },
                {
                    key: 'officeid',
                    displayName: 'Office'
                },
                {
                    key: 'startdate',
                    displayName: 'Start Date'
                },
                {
                    key: 'enddate',
                    displayName: 'End Date'
                }
            ];
            this.dataService.getAllCourses()
                .pipe(
                    first(),
                    map((courses: Course[]) => this.dataSource.data = courses)
                )
                .subscribe()
        }
         this.displayedColumns = this.displayedColumnsConfig.map(config => config.key);
    }

    private destroy$: Subject<boolean> = new Subject();

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
