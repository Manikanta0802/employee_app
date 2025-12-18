package com.example.employeeavailability.controller;

import com.example.employeeavailability.dto.LeaveResponse;
import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.model.LeaveRequest;
import com.example.employeeavailability.model.LeaveStatus;
import com.example.employeeavailability.repository.LeaveRequestRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    private final LeaveRequestRepository leaveRepository;

    public LeaveController(LeaveRequestRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    /**
     * ✅ Employee → Request leave
     */
    @PostMapping("/employee/request")
    public LeaveResponse requestLeave(
            Authentication auth,
            @RequestParam LocalDate fromDate,
            @RequestParam LocalDate toDate,
            @RequestParam String reason
    ) {

        Employee employee = (Employee) auth.getPrincipal();

        if (employee.getManager() == null) {
            throw new RuntimeException("No manager assigned to employee");
        }

        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(employee);
        leave.setManager(employee.getManager());
        leave.setFromDate(fromDate);
        leave.setToDate(toDate);
        leave.setReason(reason);
        leave.setStatus(LeaveStatus.PENDING);

        LeaveRequest saved = leaveRepository.save(leave);
        return mapToLeaveResponse(saved);
    }

    /**
     * ✅ Employee → View own leaves
     */
    @GetMapping("/employee/my")
    public List<LeaveResponse> myLeaves(Authentication auth) {

        Employee employee = (Employee) auth.getPrincipal();

        return leaveRepository.findByEmployee(employee)
                .stream()
                .map(this::mapToLeaveResponse)
                .toList();
    }

    /**
     * ✅ Manager → View team leave requests
     */
    @GetMapping("/manager/team")
    public List<LeaveResponse> teamLeaves(Authentication auth) {

        Employee manager = (Employee) auth.getPrincipal();

        return leaveRepository.findByManager(manager)
                .stream()
                .map(this::mapToLeaveResponse)
                .toList();
    }

    /**
     * ✅ Manager → Approve leave
     */
    @PostMapping("/manager/{id}/approve")
    public void approveLeave(@PathVariable Long id, Authentication auth) {
        updateLeaveStatus(id, LeaveStatus.APPROVED, auth);
    }

    /**
     * ✅ Manager → Reject leave
     */
    @PostMapping("/manager/{id}/reject")
    public void rejectLeave(@PathVariable Long id, Authentication auth) {
        updateLeaveStatus(id, LeaveStatus.REJECTED, auth);
    }

    private void updateLeaveStatus(Long id, LeaveStatus status, Authentication auth) {

        Employee manager = (Employee) auth.getPrincipal();

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        if (!leave.getManager().getId().equals(manager.getId())) {
            throw new RuntimeException("Unauthorized action");
        }

        leave.setStatus(status);
        leaveRepository.save(leave);
    }

    private LeaveResponse mapToLeaveResponse(LeaveRequest leave) {
        LeaveResponse r = new LeaveResponse();
        r.id = leave.getId();
        r.employeeName = leave.getEmployee().getName();
        r.fromDate = leave.getFromDate();
        r.toDate = leave.getToDate();
        r.reason = leave.getReason();
        r.status = leave.getStatus().name();
        return r;
    }
}
