package com.example.employeeavailability.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AttendanceResponse {

    public Long id;
    public LocalDate date;
    public LocalDateTime checkIn;
    public LocalDateTime checkOut;
    public String employeeName;
}
