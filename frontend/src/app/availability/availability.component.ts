import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee.service';
import { AttendanceService } from '../services/attendance.service';
import { LeaveService } from '../services/leave.service';
import { AuthService } from '../services/auth.service';

import { EmployeeMe, Attendance, LeaveRequest } from '../models';
import { CalendarComponent } from '../calendar/calendar.component';


@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    CalendarComponent
  ],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  employee: EmployeeMe | null = null;
  attendance: Attendance[] = [];
  leaves: LeaveRequest[] = [];

  loading = true;
  saving = false;
  error: string | null = null;
  success: string | null = null;

  statuses: Array<'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE'> = [
    'AVAILABLE',
    'UNAVAILABLE',
    'ON_LEAVE'
  ];

  selectedStatus: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE' = 'AVAILABLE';

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    this.employeeService.getSelf().subscribe({
      next: emp => {
        this.employee = emp;
        this.selectedStatus = emp.availabilityStatus;
        this.loadAttendance();
        this.loadLeaves();
      },
      error: () => {
        this.error = 'Failed to load employee';
        this.loading = false;
      }
    });
  }

  loadAttendance() {
    this.attendanceService.myAttendance().subscribe({
      next: logs => {
        this.attendance = logs;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load attendance';
        this.loading = false;
      }
    });
  }

  loadLeaves() {
    this.leaveService.myLeaves().subscribe({
      next: data => {
        this.leaves = data;
      },
      error: () => {
        this.error = 'Failed to load leave data';
      }
    });
  }

  changeStatus(status: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE') {
    if (!this.employee) return;

    this.saving = true;
    this.error = null;
    this.success = null;

    this.employeeService.updateAvailability(status).subscribe({
      next: emp => {
        this.employee = emp;
        this.selectedStatus = emp.availabilityStatus;
        this.success = 'Availability updated';
        this.saving = false;
      },
      error: () => {
        this.error = 'Failed to update availability';
        this.saving = false;
      }
    });
  }

  checkIn() {
    this.attendanceService.checkIn().subscribe({
      next: () => {
        this.success = 'Checked in successfully';
        this.loadAttendance();
      },
      error: err => {
        this.error = err?.error || 'Check-in failed';
      }
    });
  }

  checkOut() {
    this.attendanceService.checkOut().subscribe({
      next: () => {
        this.success = 'Checked out successfully';
        this.loadAttendance();
      },
      error: err => {
        this.error = err?.error || 'Check-out failed';
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
