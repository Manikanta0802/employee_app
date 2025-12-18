package com.example.employeeavailability;

import com.example.employeeavailability.model.Employee;
import com.example.employeeavailability.model.Role;
import com.example.employeeavailability.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EmployeeAvailabilityApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeAvailabilityApplication.class, args);
        System.out.println("🚀 Employee Availability Backend Started Successfully!");
    }

    /**
     * ✅ Bootstrap default HR admin
     * username: admin
     * password: admin
     */
    @Bean
    CommandLineRunner createDefaultAdmin(
            EmployeeRepository employeeRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            employeeRepository.findByEmail("admin").ifPresentOrElse(
                admin -> {
                    // admin already exists → do nothing
                },
                () -> {
                    Employee admin = new Employee();
                    admin.setName("HR Admin");
                    admin.setEmail("admin");
                    admin.setPasswordHash(passwordEncoder.encode("admin"));
                    admin.setRole(Role.HR_ADMIN);

                    employeeRepository.save(admin);

                    System.out.println("✅ Default HR Admin created (admin/admin)");
                }
            );
        };
    }
}
