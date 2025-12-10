package com.example.employeeavailability;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.example.employeeavailability",               // main package
        "com.example.employeeavailability.config",        // SecurityConfig
        "com.example.employeeavailability.security",      // JWT service, Authentication classes
        "com.example.employeeavailability.filter",        // JwtAuthenticationFilter
        "com.example.employeeavailability.controller",    // REST controllers
        "com.example.employeeavailability.repository",    // JPA repositories
        "com.example.employeeavailability.service",       // Services
        "com.example.employeeavailability.model"          // Entities
})
public class EmployeeAvailabilityApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeAvailabilityApplication.class, args);
        System.out.println("🚀 Employee Availability Backend Started Successfully!");
    }
}
