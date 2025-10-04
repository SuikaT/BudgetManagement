package com.suika.bm.database.entity;

import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.enums.ExpenseSchedule;
import com.suika.bm.model.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "budget_item")
public class BudgetItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    ExpenseCategory category;

    String label;

    float targetAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "schedule")
    ExpenseSchedule schedule;

    @Column(name = "auto_add")
    boolean autoAddToExpenses;


    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    PaymentMethod paymentMethod;

    LocalDate date;

    Integer spent;

    @ManyToOne(fetch = FetchType.LAZY) // LAZY is usually better than EAGER
    @JoinColumn(name = "user_id", nullable = false) // FK column in expense table
    private UserEntity user;
}
