package com.suika.bm.database.entity;

import com.suika.bm.model.enums.ExpenseCategory;
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
}
