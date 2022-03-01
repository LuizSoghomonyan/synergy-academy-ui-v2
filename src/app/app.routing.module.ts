import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AllstudentsComponent} from "./allstudents/allstudents.component";
import {TestComponent} from "./test/test.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {AllcoursesComponent} from "./allcourses/allcourses.component";
import {StudentProfileComponent} from "./student-profile/student-profile.component";

//http://localhost:4200  - All Student
//http://localhost:4200/courses
//http://localhost:4200
const routes: Routes = [
    {path: 'students', component: AllstudentsComponent},
    {path: 'courses', component: AllcoursesComponent},
    {path: 'test', component: TestComponent},
    {path: 'student/:id', component: StudentProfileComponent},
    {path: '**', component: PagenotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
