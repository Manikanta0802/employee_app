package com.example.employeeavailability.controller;

import com.example.employeeavailability.dto.AttendanceResponse;
import com.example.employeeavailability.model.Attendance;
import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.repository.AttendanceRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/employee/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    public AttendanceController(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @PostMapping("/check-in")
    public String checkIn(Authentication auth) {

        Employee employee = (Employee) auth.getPrincipal();
        LocalDate today = LocalDate.now();

        attendanceRepository.findByEmployeeAndDate(employee, today)
                .ifPresent(a -> {
                    throw new RuntimeException("Already checked in today");
                });

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(today);
        attendance.setCheckIn(LocalDateTime.now());

        attendanceRepository.save(attendance);

        return "Checked in successfully";
    }

    @PostMapping("/check-out")
    public String checkOut(Authentication auth) {

        Employee employee = (Employee) auth.getPrincipal();
        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository
                .findByEmployeeAndDate(employee, today)
                .orElseThrow(() -> new RuntimeException("No check-in found for today"));

        if (attendance.getCheckOut() != null) {
            throw new RuntimeException("Already checked out today");
        }

        attendance.setCheckOut(LocalDateTime.now());
        attendanceRepository.save(attendance);

        return "Checked out successfully";
    }

    @GetMapping("/my")
    public List<AttendanceResponse> myAttendance(Authentication auth) {

        Employee employee = (Employee) auth.getPrincipal();

        return attendanceRepository.findByEmployee(employee)
                .stream()
                .map(a -> {
                    AttendanceResponse r = new AttendanceResponse();
                    r.id = a.getId();
                    r.date = a.getDate();
                    r.checkIn = a.getCheckIn();
                    r.checkOut = a.getCheckOut();
                    r.employeeName = employee.getName();
                    return r;
                })
                .toList();
    }
}
