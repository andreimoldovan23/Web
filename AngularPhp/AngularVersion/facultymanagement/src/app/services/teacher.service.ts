import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnrolmentComposite } from '../interfaces/enrolmentComposite';
import { EnrolmentSimple } from '../interfaces/enrolmentSimple';
import { Group } from '../interfaces/GroupObj';
import { StudentCourse } from '../interfaces/studentCourse';
import { Teacher } from '../interfaces/teacher';
import { AbstractService } from './abstract-service.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacherDetailsUrl = `${this.utils.baseUrl}teacher.php`;
  private groupsUrl = `${this.utils.baseUrl}groups.php`;
  private addGradeUrl = `${this.utils.baseUrl}grade_add.php`;
  private studentsUrl = `${this.utils.baseUrl}students.php`;
  private updateGradeUrl = `${this.utils.baseUrl}grade_update.php`;
  private studentGradesUrl = `${this.utils.baseUrl}student_grades.php`;

  constructor(private utils: AbstractService) {}

  getTeacherDetails() : Observable<Teacher> {
    return this.utils.getOneItem<Teacher>(this.teacherDetailsUrl);
  }

  getGroups() : Observable<Group[]> {
    return this.utils.getItems<Group>(this.groupsUrl);
  }

  addGrade(enrolmentDetails: EnrolmentComposite) : Observable<any> {
    const url = `${this.addGradeUrl}?sid=${enrolmentDetails.sid}&cid=${enrolmentDetails.cid}&grade=${enrolmentDetails.grade}`;
    return this.utils.addItem<EnrolmentComposite>(enrolmentDetails, url);
  }

  updateGrade(enrolmentDetails: EnrolmentSimple) : Observable<any> {
    const url = `${this.updateGradeUrl}?enrolId=${enrolmentDetails.enrolId}&grade=${enrolmentDetails.grade}`;
    return this.utils.updateItem<EnrolmentSimple>(enrolmentDetails, url);
  }

  getStudentsFromGroup(group: number) : Observable<StudentCourse[]> {
    const url = `${this.studentsUrl}?group=${group}`;
    return this.utils.getItems<StudentCourse>(url);
  }

  getStudentGrades(sid: number, cid: number) : Observable<EnrolmentSimple[]> {
    const url = `${this.studentGradesUrl}?sid=${sid}&cid=${cid}`;
    return this.utils.getItems<EnrolmentSimple>(url);
  }
  
}
