import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Student{
  fullName: string,
  email:string,
  phone: string
}

@Injectable({providedIn: 'root'})
export class DataService{

  allStudents: Student[] = []

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
     return  this.http.get<Student[]>('http://localhost:1238/students');
     // ('https://jsonplaceholder.typicode.com/posts')
      // ('http://localhost:1238/students')
  }



}




