import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMe, Attendance, LeaveRequest } from '../models';
import { AttendanceService } from '../services/attendance.service';
import { LeaveService } from '../services/leave.service';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  team: EmployeeMe[] = [];
  attendance: Attendance[] = [];
  leaves: LeaveRequest[] = [];

  loading = true;
  error: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    this.employeeService.getAll().subscribe({
      next: team => {
        this.team = team;
        this.loadAttendance();
        this.loadLeaves();
      },
      error: () => {
        this.error = 'Failed to load team';
        this.loading = false;
      }
    });
  }

  loadAttendance() {
    this.attendanceService.myAttendance().subscribe({
      next: data => this.attendance = data,
      error: () => this.error = 'Failed to load attendance'
    });
  }

  loadLeaves() {
    this.leaveService.teamLeaves().subscribe({
      next: data => {
        this.leaves = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load leaves';
        this.loading = false;
      }
    });
  }

  approve(id: number) {
    this.leaveService.approve(id).subscribe(() => {
      this.loadLeaves();
    });
  }

  reject(id: number) {
    this.leaveService.reject(id).subscribe(() => {
      this.loadLeaves();
    });
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
