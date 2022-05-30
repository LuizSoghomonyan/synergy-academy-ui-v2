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
    birthday: string,
    checkbox ?: boolean
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
    classmarkertestid : string,
    startdate : Date
}

export interface ExamStudentResult{
    studnetid: number,
    fullname: string,
    grade: number,
    comment: string
}


export interface EducationProcess{
    courseeducationprocessid: number,
    courseid: number,
    enddate : Date,
    startdate : Date
    subjectid: string,
    lecturerid: string
}
export interface EducationProcessGradesAndFeedbacks{
    courseeducationprocessgradesid: number,
    courseeducationprocessid: number,
    studentid: string,
    grades : number,
    numberofpasses : number,
    test : number,
    comment: string
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
        classmarkertestid : '',
        startdate : new Date()
    }

    newEducationProcess: EducationProcess = {
        courseeducationprocessid: 0,
        courseid: 0,
        enddate : new Date(),
        startdate : new Date(),
        subjectid: '',
        lecturerid: ''
    }

    newEducationProcessGradesAndFeedbacks : EducationProcessGradesAndFeedbacks = {
        courseeducationprocessgradesid: 0,
        courseeducationprocessid: 0,
        studentid: 'Student1',
        grades : 13,
        numberofpasses : 11,
        test : 44,
        comment: 'Good!!'
    }
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

    ///exams/{examId}/students:
    getStudentsByExamId(id: number): Observable<Student[]>{
        return this.http.get<Student[]>(`http://localhost:1238/exams/${id}/students`)
    }

    getStudentsResultsByExamId(id: number): Observable<ExamStudentResult[]>{
        return this.http.get<ExamStudentResult[]>(`http://localhost:1238/exams/${id}/results`)
    }

    getStudentsByCourseId(id:number) : Observable<Student[]>{
        return this.http.get<Student[]>(`http://localhost:1238/courses/${id}/students`)
    }
    getEducationProcess(courseid:number) : Observable<EducationProcess[]>{
        return this.http.get<EducationProcess[]>(`http://localhost:1238/courses/${courseid}/educationprocess`)
        // let educationProcess: EducationProcess = {
        //     courseeducationprocessid: 0,
        //     courseid: 200000,
        //     enddate : new Date(),
        //     startdate : new Date(),
        //     subjectid: 'Database',
        //     lecturerid: 'Lecturer1'
        // }
        // return of([educationProcess])
    }
    getEducationProcessGradesAndFeedbacks(id: number){
        return this.http.get<EducationProcessGradesAndFeedbacks[]>(`http://localhost:1238/educationprocess/${id}/grades`)

    }

    //return Student by id(if type = students), or course by id(if type = course)
    loadinfo(type: string, id: string):Observable<any> {
            // if(type == 'educationprocess') {
            //     let educationProcess: EducationProcess = {
            //         courseeducationprocessid: 0,
            //         courseid: 200000,
            //         enddate : new Date(),
            //         startdate : new Date(),
            //         subjectid: 'Database',
            //         lecturerid: 'Lecturer1'
            //     }
            //     return of(
            return this.http.get(`http://localhost:1238/${type}/${id}`)
    }

    updateDataById(id: number, tablename: string, formValues: any): Observable<any> {
        // if(tablename == 'exams')
        // {
        //     if(formValues['examtypeid'] == undefined)
        // }
        console.log('put', formValues)
        return this.http.put(`http://localhost:1238/${tablename}/${id}`, formValues)
    }
    updateResultsById(formValues: any){
        return this.http.put(`http://localhost:1238/exams/${formValues["courseexamid"]}/results`, formValues)
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
        else if(tablename == 'educationprocess'){
            return of([this.newEducationProcess])
        }
        else return of([])

    }

    addData(tablename: string, formValues: any, courseid?: number): Observable<any>{
        console.log('post data')
        if(tablename == 'exams'){
            console.log(formValues)
            ///courses/{courseId}/exams:
            //formValues.add('courseid', courseid)
            formValues['courseid'] = courseid;
            console.log('AFTER',formValues)
            return this.http.post(`http://localhost:1238/courses/${courseid}/exams`, formValues)
        }

        return this.http.post(`http://localhost:1238/${tablename}`, formValues);

    }


    postEmailsForClassMarker(arrayForBackend: string[], examid: number) {
        console.log('123123123', {arrayForBackend})
        this.http.post(`http://localhost:1238/exams/${examid}/email`,
            arrayForBackend
        ).subscribe()
    }





    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }


}




