import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import Student from './types/student';
import { Observable } from 'rxjs';
import Message from './types/message';


const rootEdnpoint = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  
  constructor(private http: HttpClient) { }
  getAllStudents(): Observable < Student[] > {
    return this.http.get < Student[] > (`${rootEdnpoint}/students`);
  }
  
  getStudentByID(_id: String): Observable < Student > {
    return this.http.get< Student >(`${rootEdnpoint}/students/${_id}`);
  }

  addNewStudent(data: Student): Observable < Message > {
    return this.http.post< Message >(`${rootEdnpoint}/students`, data);
  }

  updateStudent(_id: String, updateData: Student): Observable < Message > {
    console.log('service patch call ', _id, updateData)
    return this.http.patch< Message >(`${rootEdnpoint}/students/${_id}`, updateData);
  }

  deleteStudent(_id: String): Observable <Message> {
    return this.http.delete<Message>(`${rootEdnpoint}/students/${_id}`)
  }

}
