import { Component, OnInit } from '@angular/core';

export interface Student{
  fullName: string,
  email:string,
  phone: string
}

const students: Student[] = [
  {fullName: 'Std1', email: 'email1', phone: 'phone1'},
  {fullName: 'sdrf', email: 'sdf', phone: 'sdfds'},
  {fullName: 'sdferg', email: 'trtg', phone: 'nhbg'},
  {fullName: 'rtgrtg4', email: '343ger', phone: 'kgm54'},
  {fullName: '2wdr', email: '45ytr4', phone: '45t454'}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['fullName', 'email', 'phone'];
  dataSource = students;




}
