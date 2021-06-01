import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAuthGuard } from './auth/student-auth.guard';
import { TeacherAuthGuard } from './auth/teacher-auth.guard';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';

const routes: Routes = [
  {path: "teacher", component: TeacherPageComponent, canActivate: [TeacherAuthGuard]},
  {path: "student", component: StudentPageComponent, canActivate: [StudentAuthGuard]},
  {path: "error", component: ErrorComponent},
  {path: "", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StudentAuthGuard, TeacherAuthGuard]
})
export class AppRoutingModule { }
