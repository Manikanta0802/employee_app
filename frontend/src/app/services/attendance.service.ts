import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from '../models';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

  private EMP_API = '/api/employee/attendance';
  private MANAGER_API = '/api/manager';

  constructor(private http: HttpClient) {}

  checkIn() {
    return this.http.post(`${this.EMP_API}/check-in`, {});
  }

  checkOut() {
    return this.http.post(`${this.EMP_API}/check-out`, {});
  }

  myAttendance() {
    return this.http.get<Attendance[]>(`${this.EMP_API}/my`);
  }

  teamAttendance() {
    return this.http.get<Attendance[]>(`${this.MANAGER_API}/attendance`);
  }
}
