package com.suika.bm.database.entity;

import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.product.Expense;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "expense")
public class ExpenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    float amount;

    @Enumerated(EnumType.STRING)
    ExpenseCategory category;

    LocalDateTime expenseDate;

    @ManyToOne(fetch = FetchType.LAZY) // LAZY is usually better than EAGER
    @JoinColumn(name = "user_id", nullable = false) // FK column in expense table
    private UserEntity user;
}
