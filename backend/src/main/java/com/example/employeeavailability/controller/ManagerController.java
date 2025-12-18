package com.example.employeeavailability.controller;

import com.example.employeeavailability.dto.AttendanceResponse;
import com.example.employeeavailability.dto.EmployeeResponse;
import com.example.employeeavailability.model.Attendance;
import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.repository.AttendanceRepository;
import com.example.employeeavailability.repository.EmployeeRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    public ManagerController(EmployeeRepository employeeRepository,
                             AttendanceRepository attendanceRepository) {
        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * ✅ Manager → View team members
     */
    @GetMapping("/team")
    public List<EmployeeResponse> myTeam(Authentication auth) {

        Employee manager = (Employee) auth.getPrincipal();

        return employeeRepository.findAll()
                .stream()
                .filter(e -> e.getManager() != null &&
                             e.getManager().getId().equals(manager.getId()))
                .map(e -> {
                    EmployeeResponse r = new EmployeeResponse();
                    r.id = e.getId();
                    r.name = e.getName();
                    r.email = e.getEmail();
                    r.role = e.getRole().name();
                    return r;
                })
                .toList();
    }

    /**
     * ✅ Manager → View team attendance
     */
    @GetMapping("/attendance")
    public List<AttendanceResponse> teamAttendance(Authentication auth) {

        Employee manager = (Employee) auth.getPrincipal();

        return employeeRepository.findAll()
                .stream()
                .filter(e -> e.getManager() != null &&
                             e.getManager().getId().equals(manager.getId()))
                .flatMap(e -> attendanceRepository.findByEmployee(e).stream()
                        .map(a -> mapToAttendanceResponse(a, e)))
                .toList();
    }

    private AttendanceResponse mapToAttendanceResponse(Attendance a, Employee e) {
        AttendanceResponse r = new AttendanceResponse();
        r.id = a.getId();
        r.date = a.getDate();
        r.checkIn = a.getCheckIn();
        r.checkOut = a.getCheckOut();
        r.employeeName = e.getName();
        return r;
    }
}
