import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})


export class ClassifierService {

    constructor(private http: HttpClient) {
    }


    getClassifierData(classiferName: string)
    {
        return this.http.get(`http://localhost:1238/classifierservice/${classiferName}`)

            // .subscribe( x => {
            //         return x;
            // }

    }
}
