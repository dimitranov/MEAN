import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { StudentsService } from '../students.service';
import Student from '../types/student';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnChanges {
  @Input() user: Student;
  @Output() actionOver = new EventEmitter();

  formIsVisible: boolean = false;;

  name: string;
  lname: string;
  birthDate: string;
  facultyNumber: number;
  
  errorMessage: string = '';

  constructor (private students: StudentsService) {
  }

  ngOnChanges () {
    if (this.user) {
      this.formIsVisible = true;
      this.name = this.user.name;
      this.lname = this.user.lname;
      this.birthDate = this.user.birthDate;
      this.facultyNumber = this.user.facultyNumber;
    }
  }

  showForm () {
    this.formIsVisible = true;
  }

  resetForm () {
    this.formIsVisible = false;

    this.name = '';
    this.lname = '';
    this.birthDate = '';
    this.facultyNumber = 0;

    this.errorMessage = '';

    this.actionOver.emit();
  }

  handleSubmit () {
    const newUser = {
      name: this.name,
      lname: this.lname,
      birthDate: this.birthDate,
      facultyNumber: this.facultyNumber
    }

    if (this.user && this.user._id) {
      // update
      this.students.updateStudent(this.user._id, newUser).subscribe(response => {
        this.resetForm();
      });
    } else {
      // create
      this.students.addNewStudent(newUser).subscribe(response => {
        if (response.message && response.isError) {
          this.errorMessage = response.message;
        } else {
          this.resetForm();
        }
      });
    }
  }
}
