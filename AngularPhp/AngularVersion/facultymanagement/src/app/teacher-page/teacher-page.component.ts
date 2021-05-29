import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { GradesDialogComponent } from '../grades-dialog/grades-dialog.component';
import { StudentCourse } from '../interfaces/studentCourse';
import { Teacher } from '../interfaces/teacher';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['studentName', 'course', 'sid', 'cid'];
  teacher: Teacher;
  selectedGroup: number;
  selection = new SelectionModel<StudentCourse>(false, []);
  groups: number[];

  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) set matPaginator(paginate: MatPaginator) {
    this.dataSource.paginator = paginate;
  }

  constructor(private service: TeacherService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTeacherDetails();
    this.getGroups();
  }

  select(group: number) : void {
    if (this.selectedGroup == group) {
      console.log("here")
      this.selectedGroup = null;
    }
    else { 
      this.selectedGroup = group;
      this.service.getStudentsFromGroup(parseInt(localStorage.getItem("userId"), 10), this.selectedGroup)
          .subscribe(rez => this.dataSource.data = rez);
    }
  }

  getTeacherDetails() : void {
    this.service.getTeacherDetails(parseInt(localStorage.getItem("userId"), 10))
        .subscribe(rez => this.teacher = rez);
  }

  getGroups() : void {
    this.service.getGroups()
      .pipe(
        map(rez => rez.map(group => group.group))
      )
      .subscribe(groupArray => this.groups = groupArray);
  }

  applyFilter(filterValue: string) : void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  logOut() : void {
    localStorage.removeItem("userId");
    this.router.navigate(['']);
  }

  toggleRow(row) : void {
    this.selection.toggle(row);
    this.openDialog(this.selection.selected[0]);
  }

  openDialog(sCourse: StudentCourse) : void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = sCourse;
    dialogConfig.restoreFocus = false;

    this.dialog.open(GradesDialogComponent, dialogConfig)
      .afterClosed().subscribe(_ => this.selection.clear());
  }

}
