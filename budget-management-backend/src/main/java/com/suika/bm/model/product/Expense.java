package com.suika.bm.model.product;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.model.enums.ExpenseCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Expense {

    Long id;

    float amount;

    ExpenseCategory category;

    LocalDateTime expenseDate;

    public Expense(ExpenseEntity entity) {
        if(entity == null) return;

        this.id = entity.getId();
        this.amount = entity.getAmount();
        this.category = entity.getCategory();
        this.expenseDate = entity.getExpenseDate();
    }
}
