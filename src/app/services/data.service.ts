import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Student{
  fullName: string,
  email:string,
  phone: string
}

export interface Course{
    courseid?: number,
    name: string,
    description : string,
    yearid : number,
    officeid : number,
    startdate : Date,
    enddate : Date
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

    getAllCourses(): Observable<Course[]>{
        return this.http.get<Course[]>('http://localhost:1238/courses');
    }

}




