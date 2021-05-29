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

  getDetails(id: number) : Observable<Student> {
    const url = `${this.detailsUrl}?id=${id}`;
    const errorMessage = `get student details w/ id=${id}`;
    return this.utils.getOneItem<Student>(url, errorMessage);
  }

  getStudentGrades(id: number) : Observable<GradeType[]> {
    const url = `${this.gradesUrl}?id=${id}`;
    const errorMessage = `get student grades w/ id=${id}`;
    return this.utils.getItems<GradeType>(url, errorMessage);
  }
  
}
