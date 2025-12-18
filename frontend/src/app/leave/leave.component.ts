import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeaveService } from '../services/leave.service';
import { LeaveRequest } from '../models';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  leaves: LeaveRequest[] = [];

  fromDate = '';
  toDate = '';
  reason = '';

  loading = true;
  submitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadMyLeaves();
  }

  loadMyLeaves() {
    this.loading = true;
    this.leaveService.myLeaves().subscribe({
      next: res => {
        this.leaves = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load leave requests';
        this.loading = false;
      }
    });
  }

  submitLeave() {
    if (!this.fromDate || !this.toDate || !this.reason) {
      this.error = 'All fields are required';
      return;
    }

    this.submitting = true;
    this.error = null;
    this.success = null;

    this.leaveService.requestLeave({
      fromDate: this.fromDate,
      toDate: this.toDate,
      reason: this.reason
    }).subscribe({
      next: () => {
        this.success = 'Leave request submitted';
        this.fromDate = '';
        this.toDate = '';
        this.reason = '';
        this.submitting = false;
        this.loadMyLeaves();
      },
      error: err => {
        this.error = err?.error || 'Leave request failed';
        this.submitting = false;
      }
    });
  }
}
