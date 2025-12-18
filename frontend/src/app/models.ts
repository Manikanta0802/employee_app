// =========================
// AUTH
// =========================
export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
}

// =========================
// EMPLOYEE
// =========================

export interface EmployeeMe {
  id: number;
  name: string;
  email: string;
  availabilityStatus: 'AVAILABLE' | 'UNAVAILABLE' | 'ON_LEAVE';
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  managerName?: string;
}

// =========================
// ATTENDANCE
// =========================
export interface Attendance {
  id: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  employeeName?: string; // for manager view
}

// =========================
// LEAVE
// =========================
export interface LeaveRequest {
  id: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  employeeName?: string;
}
