import {ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../services/data.service";
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

export interface Student {
    fullName: string,
    email: string,
    phone: string
}

// const students: Student[] = [
// //   {fullName: 'Str1', email: 'email1', phone: 'phone1'},
// //   {fullName: 'sdrf', email: 'sdf', phone: 'sdfds'},
// //   {fullName: 'sdferg', email: 'trtg', phone: 'nhbg'},
// //   {fullName: 'asdaasdas', email: '343ger', phone: 'kgm54'},
// //   {fullName: '2wdr', email: '45ytr4', phone: '45t454'},
// //   {fullName: 'qwjy2tgd', email: 'email1', phone: 'phone1'},
// //   {fullName: 'asjuytgwbnqowy', email: 'sdf', phone: 'sdfds'},
// //   {fullName: 'iu76543456', email: 'trtg', phone: 'nhbg'},
// //   {fullName: 'bc xbnkuy2', email: '343ger', phone: 'kgm54'},
// //   {fullName: 'mjht2uc w7tgh', email: '45ytr4', phone: '45t454'},
// //   {fullName: 'kiuytfwvbnkag ', email: 'email1', phone: 'phone1'},
// //   {fullName: 'iuywtrfdvbnmkj oiuytfvb', email: 'sdf', phone: 'sdfds'},
// //   {fullName: 'qkkqnn qnn', email: 'trtg', phone: 'nhbg'},
// //   {fullName: 'kq1y627b bw', email: '343ger', phone: 'kgm54'},
// //   {fullName: 'kkcjhgg qbqgfw', email: '45ytr4', phone: '45t454'}
// ];

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges {

    // @ts-ignore
    dataSource: MatTableDataSource<Student>;
    displayedColumnsConfig: {
        key: string,
        displayName: string
    }[] = [
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
    displayedColumns: string[] = this.displayedColumnsConfig.map(config => config.key);


    constructor(private dataService: DataService) {
        this.dataSource = new MatTableDataSource<Student>()
    }

    ngOnChanges() {
        console.log('ngOnChanges')
    }

    ngOnInit() {
        console.log('ngOnInit')
        this.refreshData()
        console.log('aaaaa')
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


    refreshData(dataType: string = 'allStudents') {
        this.dataService.getAllStudents()
            .pipe(
                first(),
                map((students: Student[]) => this.dataSource.data = students)
                // , takeUntil(this.destroy$)
            )
            .subscribe();
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
