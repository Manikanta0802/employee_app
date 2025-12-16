import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeMe } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) { }

  getSelf(): Observable<EmployeeMe> {
    return this.http.get<EmployeeMe>(`${this.apiUrl}/employees/me`);
    }

  updateAvailability(status: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE'): Observable<EmployeeMe> {
    return this.http.put<EmployeeMe>(`${this.apiUrl}/employees/me/status`, {
      availabilityStatus: status
    });
  }
}
