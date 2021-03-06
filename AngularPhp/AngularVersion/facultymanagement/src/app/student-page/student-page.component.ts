import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from '../interfaces/student';
import { LoginService } from '../services/login.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['courseName', 'courseGrade', 'courseType'];
  student: Student;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) set matPaginator(paginate: MatPaginator) {
    this.dataSource.paginator = paginate;
  }

  constructor(private service: StudentService, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.data = null;
    this.getStudentDetails();
    this.getStudentGrades();
  }

  getStudentDetails() : void {
    this.service.getDetails()
        .subscribe(rez => this.student = rez);
  }

  getStudentGrades() : void {
    this.service.getStudentGrades()
        .subscribe(rezSet => this.dataSource.data = rezSet);
  }

  applyFilter(filterValue: string) : void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  logOut() : void {
    this.login.logOut()
      .subscribe(_ => this.router.navigate(['']));
  }

}
