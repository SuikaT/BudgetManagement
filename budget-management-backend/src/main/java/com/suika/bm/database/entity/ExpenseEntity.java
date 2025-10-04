package com.suika.bm.database.entity;

import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.enums.ExpenseSchedule;
import com.suika.bm.model.enums.PaymentMethod;
import com.suika.bm.model.product.Expense;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "expense")
public class ExpenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String label;

    float amount;

    LocalDate date;

    @Enumerated(EnumType.STRING)
    ExpenseCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    PaymentMethod paymentMethod;

    boolean hide;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "budget_item_id", nullable = true)
    private BudgetItemEntity relatedBudgetItem;
}
