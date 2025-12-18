import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attendance, LeaveRequest } from '../models';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() attendance: Attendance[] = [];
  @Input() leaves: LeaveRequest[] = [];

  currentDate = new Date();
  days: (Date | null)[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.days = [];

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Empty slots before month start
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.days.push(null);
    }

    // Month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      this.days.push(new Date(year, month, d));
    }
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  hasAttendance(date: Date): boolean {
    return this.attendance.some(a =>
      new Date(a.date).toDateString() === date.toDateString()
    );
  }

  hasLeave(date: Date): boolean {
    return this.leaves.some(l =>
      date >= new Date(l.fromDate) &&
      date <= new Date(l.toDate) &&
      l.status === 'APPROVED'
    );
  }
}
