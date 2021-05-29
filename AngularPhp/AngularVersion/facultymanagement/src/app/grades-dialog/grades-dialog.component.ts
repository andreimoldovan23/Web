import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnrolmentComposite } from '../interfaces/enrolmentComposite';
import { EnrolmentSimple } from '../interfaces/enrolmentSimple';
import { StudentCourse } from '../interfaces/studentCourse';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-grades-dialog',
  templateUrl: './grades-dialog.component.html',
  styleUrls: ['./grades-dialog.component.css']
})
export class GradesDialogComponent implements OnInit {
  studentGrades: EnrolmentSimple[];
  enrolmentDetails: EnrolmentComposite;
  selectedEnrolGrade: EnrolmentSimple;

  constructor(
    private ref: MatDialogRef<GradesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: StudentCourse,
    private service: TeacherService
  ) { }

  ngOnInit(): void {
    this.enrolmentDetails = {sid: this.data.sid, cid: this.data.cid, grade: 0};
    this.getStudentGrades();
  }

  getStudentGrades() : void {
    this.service.getStudentGrades(this.enrolmentDetails.sid, this.enrolmentDetails.cid)
      .subscribe(rez => this.studentGrades = rez);
  }

  addStudentGrade() : void {
    this.service.addGrade(this.enrolmentDetails)
      .subscribe(_ => this.getStudentGrades());
  }

  updateStudentGrade() : void {
    this.service.updateGrade(this.selectedEnrolGrade)
      .subscribe();
  }

  select(enrol: EnrolmentSimple) : void {
    this.selectedEnrolGrade = enrol;
  }

  close() : void {
    this.ref.close();
  }
}
