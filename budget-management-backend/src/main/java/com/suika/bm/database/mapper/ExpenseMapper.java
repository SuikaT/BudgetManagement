package com.suika.bm.database.mapper;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.model.product.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {
    public ExpenseEntity toEntity(Expense expense) {
        if (expense == null) return null;

        ExpenseEntity entity = new ExpenseEntity();
        entity.setId(expense.getId());
        entity.setAmount(expense.getAmount());
        entity.setCategory(expense.getCategory());
        entity.setExpenseDate(expense.getExpenseDate());
        return entity;
    }

    public Expense toDto(ExpenseEntity entity) {
        if (entity == null) return null;

        Expense dto = new Expense();
        dto.setId(entity.getId());
        dto.setAmount(entity.getAmount());
        dto.setCategory(entity.getCategory());
        dto.setExpenseDate(entity.getExpenseDate());
        return dto;
    }
}
