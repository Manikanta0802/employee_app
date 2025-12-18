import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private API = '/api/leave';

  constructor(private http: HttpClient) {}

  requestLeave(data: any) {
    return this.http.post(`${this.API}/employee/request`, data);
  }

  myLeaves() {
    return this.http.get<LeaveRequest[]>(`${this.API}/employee/my`);
  }

  teamLeaves() {
    return this.http.get<LeaveRequest[]>(`${this.API}/manager/team`);
  }

  approve(id: number) {
    return this.http.post(`${this.API}/manager/${id}/approve`, {});
  }

  reject(id: number) {
    return this.http.post(`${this.API}/manager/${id}/reject`, {});
  }
}
