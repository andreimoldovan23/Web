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

  getTeacherDetails(id: number) : Observable<Teacher> {
    const url = `${this.teacherDetailsUrl}?id=${id}`;
    const errorMessage = `get teacher details w/ id=${id}`;
    return this.utils.getOneItem<Teacher>(url, errorMessage);
  }

  getGroups() : Observable<Group[]> {
    const url = `${this.groupsUrl}`;
    const errorMessage = `get groups`;
    return this.utils.getItems<Group>(url, errorMessage);
  }

  addGrade(enrolmentDetails: EnrolmentComposite) : Observable<any> {
    const url = `${this.addGradeUrl}?sid=${enrolmentDetails.sid}&cid=${enrolmentDetails.cid}&grade=${enrolmentDetails.grade}`;
    const errorMessage = `add grade w/ sid=${enrolmentDetails.sid}, cid=${enrolmentDetails.cid}, grade=${enrolmentDetails.grade}`;
    return this.utils.addItem<EnrolmentComposite>(enrolmentDetails, url, errorMessage);
  }

  updateGrade(enrolmentDetails: EnrolmentSimple) : Observable<any> {
    const url = `${this.updateGradeUrl}?enrolId=${enrolmentDetails.enrolId}&grade=${enrolmentDetails.grade}`;
    const errorMessage = `update grade w/ enrolId=${enrolmentDetails.enrolId}, grade=${enrolmentDetails.grade}`;
    return this.utils.updateItem<EnrolmentSimple>(enrolmentDetails, url, errorMessage);
  }

  getStudentsFromGroup(id: number, group: number) : Observable<StudentCourse[]> {
    const url = `${this.studentsUrl}?id=${id}&group=${group}`;
    const errorMessage = `get students from group w/ teacherId=${id}, group=${group}`;
    return this.utils.getItems<StudentCourse>(url, errorMessage);
  }

  getStudentGrades(sid: number, cid: number) : Observable<EnrolmentSimple[]> {
    const url = `${this.studentGradesUrl}?sid=${sid}&cid=${cid}`;
    const errorMessage = `get grades of student w/ studentId=${sid}, courseId=${cid}`;
    return this.utils.getItems<EnrolmentSimple>(url, errorMessage);
  }
  
}
