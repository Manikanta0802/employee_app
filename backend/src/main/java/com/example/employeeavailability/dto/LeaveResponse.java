package com.example.employeeavailability.dto;

import java.time.LocalDate;

public class LeaveResponse {

    public Long id;
    public String employeeName;
    public LocalDate fromDate;
    public LocalDate toDate;
    public String reason;
    public String status;
}

