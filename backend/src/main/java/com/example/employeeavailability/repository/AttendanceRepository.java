public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEmployeeAndDate(Employee e, LocalDate date);
    List<Attendance> findByEmployee(Employee e);
}