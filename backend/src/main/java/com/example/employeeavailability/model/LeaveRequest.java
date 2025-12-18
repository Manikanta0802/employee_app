@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Employee manager;

    private LocalDate fromDate;
    private LocalDate toDate;

    private String reason;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status;
}
