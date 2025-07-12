package com.suika.bm.model.product;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.model.enums.ExpenseCategory;

import java.time.LocalDateTime;

public class Expense {

    Long id;

    float amount;

    ExpenseCategory category;

    LocalDateTime dateTime;

    public Expense(ExpenseEntity entity) {
        if(entity == null) return;

        this.id = entity.getId();
        this.amount = entity.getAmount();
        this.category = entity.getCategory();
        this.dateTime = entity.getDateTime();
    }
}
