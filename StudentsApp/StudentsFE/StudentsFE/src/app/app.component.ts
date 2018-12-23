import { Component, OnInit } from '@angular/core';
import Student from './types/student';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  studentsList: Student[];
  studentsListBack: Student[];
  selectedUser: Student;
  nameSunstring: string;

  constructor (private students: StudentsService){
    this.studentsList = [];
    this.nameSunstring = '';
  }

  ngOnInit () {
    this.pullAllusers();
  }

  pullAllusers () {
    this.students.getAllStudents().subscribe(students => {
      this.studentsList = students;
      this.studentsListBack = students;
    })
  }

  selectUserForDelete (_id: string): void {
    this.students.deleteStudent(_id).subscribe(response => {
      this.pullAllusers();
    })
  }

  selectUserForEdit (user: Student): void {
    this.selectedUser = user;
  }

  onSearchChange (substring: string) {
    if (substring === '') {
      this.studentsList = this.studentsListBack;
    } else {
      const filteredStudents = this.studentsListBack.filter(s => s.name.toLowerCase().indexOf(substring) >= 0)
      this.studentsList = filteredStudents;
    }
  }
}
