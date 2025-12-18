package com.example.employeeavailability.controller;

import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.model.Role;
import com.example.employeeavailability.repository.EmployeeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(EmployeeRepository employeeRepository,
                           PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create-employee")
    public Employee createEmployee(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam(required = false) Long managerId
    ) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setEmail(email);
        employee.setPasswordHash(passwordEncoder.encode(password));
        employee.setRole(Role.EMPLOYEE);

        if (managerId != null) {
            Employee manager = employeeRepository.findById(managerId)
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            employee.setManager(manager);
        }

        return employeeRepository.save(employee);
    }

    @PostMapping("/create-manager")
    public Employee createManager(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password
    ) {
        Employee manager = new Employee();
        manager.setName(name);
        manager.setEmail(email);
        manager.setPasswordHash(passwordEncoder.encode(password));
        manager.setRole(Role.MANAGER);

        return employeeRepository.save(manager);
    }
}
