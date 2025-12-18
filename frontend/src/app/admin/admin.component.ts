import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeMe } from '../models';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employees: EmployeeMe[] = [];

  // create form
  name = '';
  email = '';
  password = '';
  role = 'EMPLOYEE';
  managerId: number | null = null;

  loading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  createEmployee() {
    this.error = null;
    this.success = null;

    this.employeeService.create({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      managerId: this.managerId
    }).subscribe({
      next: () => {
        this.success = 'Employee created successfully';
        this.resetForm();
        this.loadEmployees();
      },
      error: err => {
        this.error = err?.error || 'Creation failed';
      }
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = 'EMPLOYEE';
    this.managerId = null;
  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
