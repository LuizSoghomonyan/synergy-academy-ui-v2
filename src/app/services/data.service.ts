import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";


export interface Student {
    fullname: string,
    email: string,
    studentid: number,
    firstname: string,
    lastname: string,
    phonenumber: string,
    address: string,
    universityid: string,
    gpa: number,
    whatprogramminglanguagesdoyouknow: string,
    educationdepartmentadmissionandgraduationyear: string,
    othercoursesattended: string,
    haveyoueverparticipatedinprogramming: string,
    doyouhaveworkexperience: string,
    howdidyoufindid: string,
    birthday: string
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
    private destroy$: Subject<boolean> = new Subject();
    allStudents: Student[] = []
    newStudent: Student = {
        address: '',
        birthday: '',
        doyouhaveworkexperience: '',
        educationdepartmentadmissionandgraduationyear: '',
        email: '',
        firstname: '',
        fullname: '',
        gpa: 0,
        haveyoueverparticipatedinprogramming: '',
        howdidyoufindid: '',
        lastname: '',
        othercoursesattended: '',
        phonenumber: '',
        studentid: 0,
        universityid: '',
        whatprogramminglanguagesdoyouknow: '',
    }

    // { birthday: string; firstname: string; address: string; whatprogramminglanguagesdoyouknow: string; phonenumber: string; othercoursesattended: string; lastname: string; studentid: number; howdidyoufindid: string; universityid: string; educationdepartmentadmissionandgraduationyear: string; haveyoueverparticipatedinprogramming: string; doyouhaveworkexperience: string; gpa: number; fullname: string; email: string }
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
        if (type == 'student')
            return this.http.get(`http://localhost:1238/students/${id}`)
        return;
    }

    updateDataById(id: number, tablename: string, formValues: any): Observable<any> {
        console.log('formValues', formValues)
        return this.http.put(`http://localhost:1238/${tablename}/${id}`, formValues)
    }


    addNew(tablename: string): Observable<any> {
        let ob;
        // if (tablename == 'student') {
        ob = of(this.newStudent);
        return ob
        // }

    }


    maxId(tablename: string):  Observable<number>{
        //return this.http.get<number>(`http://localhost:1238/${tablename}/maxid`)
        return  of(1001);
    }











    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}




