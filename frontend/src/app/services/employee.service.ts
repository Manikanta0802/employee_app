import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeMe } from '../models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private apiUrl = `/api`;

  constructor(private http: HttpClient) {}

  getSelf(): Observable<EmployeeMe> {
    return this.http.get<EmployeeMe>(`${this.apiUrl}/employees/me`);
  }

  updateAvailability(
    status: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE'
  ): Observable<EmployeeMe> {
    return this.http.put<EmployeeMe>(
      `${this.apiUrl}/employees/me/status`,
      { availabilityStatus: status }
    );
  }

  // ADMIN
  create(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    managerId?: number | null;
  }) {
    return this.http.post(`${this.apiUrl}/admin/create`, data);
  }
}
