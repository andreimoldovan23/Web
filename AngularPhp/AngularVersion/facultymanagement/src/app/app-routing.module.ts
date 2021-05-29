import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';

const routes: Routes = [
  {path: "teacher", component: TeacherPageComponent},
  {path: "student", component: StudentPageComponent},
  {path: "error", component: ErrorComponent},
  {path: "", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
