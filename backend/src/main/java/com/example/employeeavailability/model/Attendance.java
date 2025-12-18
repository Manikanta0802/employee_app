package com.example.employeeavailability.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate date;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;

    // Standard Getters and Setters (or use @Data if you have Lombok)
}