package com.example.employeeavailability.repository;

import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

    List<LeaveRequest> findByManager(Employee manager);
}
