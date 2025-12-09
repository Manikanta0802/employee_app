import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { EmployeeMe } from '../models';
import { FormsModule } from '@angular/forms';   // <-- IMPORTANT

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule         // <-- REQUIRED for ngModel
  ],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  employee: EmployeeMe | null = null;
  loading = true;
  saving = false;
  error: string | null = null;
  success: string | null = null;

  // Dropdown values
  statuses: Array<'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE'> = [
    'AVAILABLE', 'UNAVAILABLE', 'ON_LEAVE'
  ];

  // ⬅️ Selected dropdown value (separate from employee data)
  selectedStatus: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE' = 'AVAILABLE';

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.error = null;

    this.employeeService.getSelf().subscribe({
      next: (emp) => {
        this.employee = emp;
        this.selectedStatus = emp.availabilityStatus;  // <-- set dropdown default
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error || 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  changeStatus(status: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE') {
    if (!this.employee) return;

    this.saving = true;
    this.error = null;
    this.success = null;

    this.employeeService.updateAvailability(status).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.selectedStatus = emp.availabilityStatus;  // <-- refresh UI
        this.saving = false;
        this.success = 'Availability updated';
      },
      error: (err) => {
        this.error = err?.error || 'Failed to update';
        this.saving = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}