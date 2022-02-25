import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../services/data.service";
import {delay, from, interval, map, mergeAll, mergeMap, of, tap} from "rxjs";
import {MatSort} from "@angular/material/sort";

export interface Student{
  fullName: string,
  email:string,
  phone: string
}

const students: Student[] = [
//   {fullName: 'Str1', email: 'email1', phone: 'phone1'},
//   {fullName: 'sdrf', email: 'sdf', phone: 'sdfds'},
//   {fullName: 'sdferg', email: 'trtg', phone: 'nhbg'},
//   {fullName: 'asdaasdas', email: '343ger', phone: 'kgm54'},
//   {fullName: '2wdr', email: '45ytr4', phone: '45t454'},
//   {fullName: 'qwjy2tgd', email: 'email1', phone: 'phone1'},
//   {fullName: 'asjuytgwbnqowy', email: 'sdf', phone: 'sdfds'},
//   {fullName: 'iu76543456', email: 'trtg', phone: 'nhbg'},
//   {fullName: 'bc xbnkuy2', email: '343ger', phone: 'kgm54'},
//   {fullName: 'mjht2uc w7tgh', email: '45ytr4', phone: '45t454'},
//   {fullName: 'kiuytfwvbnkag ', email: 'email1', phone: 'phone1'},
//   {fullName: 'iuywtrfdvbnmkj oiuytfvb', email: 'sdf', phone: 'sdfds'},
//   {fullName: 'qkkqnn qnn', email: 'trtg', phone: 'nhbg'},
//   {fullName: 'kq1y627b bw', email: '343ger', phone: 'kgm54'},
//   {fullName: 'kkcjhgg qbqgfw', email: '45ytr4', phone: '45t454'}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor(private dataService: DataService,private ref: ChangeDetectorRef) { }

  displayedColumns: string[] = ['fullName', 'email', 'phone'];

 // @ts-ignore
  dataSource: MatTableDataSource<Student> = [];



  ngOnInit() {
    this.dataSource = new MatTableDataSource<Student>(students);
    this.dataService.getAllStudents()
      .pipe(
        mergeMap(x => from(x)),
        map(student => {
          // @ts-ignore
          const student_for_push: Student = {fullName: student['fullname'], email: student['email'], phone: student['phonenumber']};
          this.dataSource.data.push(student_for_push)
        })
      )
      .subscribe(s => {
      })
  }

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  // @ts-ignore
  @ViewChild(MatTable) matTable: MatTable<any>;

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  refreshData(dataType: string = 'allStudents'){
    this.dataService.getAllStudents()
      .pipe(
        mergeMap(x => from(x)),
        map(student => {
          // @ts-ignore
          const student_for_push: Student = {fullName: student['fullname'], email: student['email'], phone: student['phonenumber']};
          this.dataSource.data.push(student_for_push)
        })
      )
      .subscribe(s => {
        this.matTable.renderRows()
        console.log(this.matTable)
      })

  }


}
