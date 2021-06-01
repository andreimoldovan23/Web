import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeType } from '../interfaces/gradeType';
import { Student } from '../interfaces/student';
import { AbstractService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private detailsUrl: string = `${this.utils.baseUrl}student.php`;
  private gradesUrl: string = `${this.utils.baseUrl}grades.php`;

  constructor(private utils: AbstractService) { }

  getDetails() : Observable<Student> {
    return this.utils.getOneItem<Student>(this.detailsUrl);
  }

  getStudentGrades() : Observable<GradeType[]> {
    return this.utils.getItems<GradeType>(this.gradesUrl);
  }
  
}
