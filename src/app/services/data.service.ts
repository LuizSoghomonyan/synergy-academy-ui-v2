import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, takeUntil} from "rxjs";

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
    type: string,
    orderid: number
}

export interface Exam{
    courseexamid : number,
    courseid : number,
    enddate : Date,
    examtypeid : string,
    name : string,
    startdate : Date
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

    newCourse: Course = {
        courseid: 0,
        name: '',
        description: '',
        yearid: 0,
        officeid: 0,
        startdate: new Date(),
        enddate: new Date()
    };

    newExam: Exam = {
        courseexamid : 0,
        courseid : 0,
        enddate : new Date(),
        examtypeid : '',
        name : '',
        startdate : new Date()
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
        return this.http.get<Config[]>(`http://localhost:1238/config/${type}`)
    }

    getExams(id: number): Observable<Exam[]> {
        return this.http.get<Exam[]>(`http://localhost:1238/courses/${id}/exams`);
    }

    //return Student by id(if type = students), or course by id(if type = course)
    loadinfo(type: string, id: string):Observable<any> {
            return this.http.get(`http://localhost:1238/${type}/${id}`)
    }

    updateDataById(id: number, tablename: string, formValues: any): Observable<any> {
        console.log('formValues', formValues)
        return this.http.put(`http://localhost:1238/${tablename}/${id}`, formValues)
    }


    addNew(tablename: string): Observable<any> {
        let ob;
        //TODO for course
        if (tablename == 'student') {
            return of([this.newStudent]);
        }
        else if(tablename == 'course'){
            return of([this.newCourse])
        }
        else if(tablename == 'exam'){
            return of([this.newExam])
        }
        else return of([])

    }

    addData(tablename: string, formValues: any): Observable<any>{
        console.log('post data')
        return this.http.post(`http://localhost:1238/${tablename}`, formValues);

    }






    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}




