package com.suika.bm.database.mapper;

import com.suika.bm.database.entity.BudgetItemEntity;
import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.model.product.BudgetItem;
import com.suika.bm.model.product.Expense;
import org.springframework.stereotype.Component;

@Component
public class BudgetItemMapper {
    public BudgetItemEntity toEntity(BudgetItem expense) {
        if (expense == null) return null;

        BudgetItemEntity entity = new BudgetItemEntity();
        entity.setId(expense.getId());
        entity.setCategory(expense.getCategory());
        entity.setLabel(expense.getLabel());
        entity.setTargetAmount(expense.getTargetAmount());
        entity.setSchedule(expense.getSchedule());
        entity.setAutoAddToExpenses(expense.isAutoAddToExpenses());
        entity.setPaymentMethod(expense.getPaymentMethod());
        entity.setDate(expense.getDate());
        entity.setSpent(expense.getSpent());

        return entity;
    }

    public BudgetItem toDto(BudgetItemEntity entity) {
        if (entity == null) return null;

        BudgetItem dto = new BudgetItem();
        dto.setId(entity.getId());
        dto.setCategory(entity.getCategory());
        dto.setLabel(entity.getLabel());
        dto.setTargetAmount(entity.getTargetAmount());
        dto.setSchedule(entity.getSchedule());
        dto.setAutoAddToExpenses(entity.isAutoAddToExpenses());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setDate(entity.getDate());
        dto.setSpent(entity.getSpent());
        return dto;
    }

    public void updateEntityFromDto(BudgetItemEntity entity, BudgetItem expense) {
        if(entity == null || expense == null) {
            return;
        }

        entity.setCategory(expense.getCategory());
        entity.setLabel(expense.getLabel());
        entity.setTargetAmount(expense.getTargetAmount());
        entity.setSchedule(expense.getSchedule());
        entity.setAutoAddToExpenses(expense.isAutoAddToExpenses());
        entity.setPaymentMethod(expense.getPaymentMethod());
        entity.setDate(expense.getDate());
        entity.setSpent(expense.getSpent());
    }
}
