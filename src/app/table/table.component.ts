import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface Student{
  fullName: string,
  email:string,
  phone: string
}

const students: Student[] = [
  {fullName: 'Str1', email: 'email1', phone: 'phone1'},
  {fullName: 'sdrf', email: 'sdf', phone: 'sdfds'},
  {fullName: 'sdferg', email: 'trtg', phone: 'nhbg'},
  {fullName: 'asdaasdas', email: '343ger', phone: 'kgm54'},
  {fullName: '2wdr', email: '45ytr4', phone: '45t454'},
  {fullName: 'qwjy2tgd', email: 'email1', phone: 'phone1'},
  {fullName: 'asjuytgwbnqowy', email: 'sdf', phone: 'sdfds'},
  {fullName: 'iu76543456', email: 'trtg', phone: 'nhbg'},
  {fullName: 'bc xbnkuy2', email: '343ger', phone: 'kgm54'},
  {fullName: 'mjht2uc w7tgh', email: '45ytr4', phone: '45t454'},
  {fullName: 'kiuytfwvbnkag ', email: 'email1', phone: 'phone1'},
  {fullName: 'iuywtrfdvbnmkj oiuytfvb', email: 'sdf', phone: 'sdfds'},
  {fullName: 'qkkqnn qnn', email: 'trtg', phone: 'nhbg'},
  {fullName: 'kq1y627b bw', email: '343ger', phone: 'kgm54'},
  {fullName: 'kkcjhgg qbqgfw', email: '45ytr4', phone: '45t454'}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['fullName', 'email', 'phone'];
  // dataSource = students;

  dataSource = new MatTableDataSource<Student>(students);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


}
