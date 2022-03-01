import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Student {
    fullname: string,
    email: string,
    studentid : number,
    firstname : string,
    lastname : string,
    phonenumber : string,
    address : string,
    universityid : number,
    gpa : number,
    whatprogramminglanguagesdoyouknow : string,
    educationdepartmentadmissionandgraduationyear : string,
    othercoursesattended : string,
    haveyoueverparticipatedinprogramming : string,
    doyouhaveworkexperience : string,
    howdidyoufindid : number,
    stateid : number
    // ,birthday: string
}

export interface Course {
    courseid: number,
    name: string,
    description: string,
    yearid: number,
    officeid: number,
    startdate: Date,
    enddate: Date
}

export interface Config {
    _key: string,
    displayname: string,
    type: string
}

@Injectable({providedIn: 'root'})
export class DataService {

    allStudents: Student[] = []

    constructor(private http: HttpClient) {
    }

    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>('http://localhost:1238/students');
    }

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('http://localhost:1238/courses');
    }

    getConfigs(type: string) {
        return this.http.get<Config[]>('http://localhost:1238/config/')
    }

    //return Student by id(if type = student), or course by id(if type = course)
    loadinfo(type: string, id: string) {
        return this.http.get('http://localhost:1238/students/' + id)
    }

}




