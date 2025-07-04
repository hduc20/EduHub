import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EnrollmentDTO } from '../dtos/requests/enrollment.dto';
import { HttpUtilService } from './http.util.service';
import { JoinClassDTO } from '../dtos/requests/join-class.dto';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiAddStudent = `${environment.apiBaseUrl}/enrollments/add`;
  private apiJoinClass = `${environment.apiBaseUrl}/enrollments/join`;
  constructor(private http: HttpClient,
    private httpUtilService : HttpUtilService
  ) { }

  private getApiConfig() {
    return {
      headers: this.httpUtilService.createHeaders(),
    };
  }

  getAllClassByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/enrollments/student/${studentId}`);
  }

  getAllStudentInClass(classId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/enrollments/class/${classId}`);
  }

  addStudent(enrollmentDTO: EnrollmentDTO): Observable<any> {
    return this.http.post(this.apiAddStudent, enrollmentDTO, this.getApiConfig());
  }

  joinClass(joinClassDTO: JoinClassDTO): Observable<any> {
    return this.http.post(this.apiJoinClass, joinClassDTO, this.getApiConfig());
  }

  exportStudentsInClassToExcel(classId: number) {
    return this.http.get(`${environment.apiBaseUrl}/enrollments/class/${classId}/export`, { responseType: 'blob' });
  }

  searchStudentsInClass(classId: number, keyword: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/enrollments/class/${classId}/search`, { params: { keyword } });
  }

  getPendingStudentsInClass(classId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/enrollments/class/${classId}/pending`);
  }

  approveStudent(enrollmentId: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/enrollments/approve/${enrollmentId}`, {});
  }

  approveAllPendingStudents(classId: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/enrollments/class/${classId}/approve-all`, {});
  }

  removeStudentFromClass(classId: number, studentId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/enrollments/class/${classId}/student/${studentId}`);
  }
}
