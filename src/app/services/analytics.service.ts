import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject, takeUntil} from "rxjs";
@Injectable({providedIn: 'root'})
export class AnalyticsService {
    constructor(private http: HttpClient) {

    }

    tableReport(): Observable<any>{
        return this.http.get('http://localhost:1238/reports/tableReport')
    }

    histogram(): Observable<any>{
        return this.http.get('http://localhost:1238/reports/histogram');
    }

    pieChart(): Observable<any>{
        return this.http.get('http://localhost:1238/reports/pieChart');
    }

    columnChart():Observable<any>{
        return this.http.get('http://localhost:1238/reports/columnChart');
    }

}
