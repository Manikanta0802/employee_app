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

  loadDashboard(): void {
    this.loading = true;
    this.error = null;

    this.employeeService.getAll().subscribe({
      next: (team: EmployeeMe[]) => {
        this.team = team;
        this.loadAttendance();
        this.loadLeaves();
      },
      error: (err: any) => {
        this.error = err?.error || 'Failed to load team';
        this.loading = false;
      }
    });
  }

  loadAttendance(): void {
    this.attendanceService.myAttendance().subscribe({
      next: (data: Attendance[]) => {
        this.attendance = data;
      },
      error: () => {
        this.error = 'Failed to load attendance';
      }
    });
  }

  loadLeaves(): void {
    this.leaveService.teamLeaves().subscribe({
      next: (data: LeaveRequest[]) => {
        this.leaves = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load leaves';
        this.loading = false;
      }
    });
  }

  approve(id: number): void {
    this.leaveService.approve(id).subscribe(() => {
      this.loadLeaves();
    });
  }

  reject(id: number): void {
    this.leaveService.reject(id).subscribe(() => {
      this.loadLeaves();
    });
  }

  logout(): void {
    this.auth.logout();
    location.href = '/login';
  }
}
