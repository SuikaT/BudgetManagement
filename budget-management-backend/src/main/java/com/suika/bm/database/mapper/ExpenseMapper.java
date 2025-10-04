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
        entity.setLabel(expense.getLabel());
        entity.setAmount(expense.getAmount());
        entity.setDate(expense.getDate());
        entity.setCategory(expense.getCategory());
        entity.setPaymentMethod(expense.getPaymentMethod());
        entity.setHide(expense.isHide());

        return entity;
    }

    public Expense toDto(ExpenseEntity entity) {
        if (entity == null) return null;

        Expense dto = new Expense();
        dto.setId(entity.getId());
        dto.setLabel(entity.getLabel());
        dto.setAmount(entity.getAmount());
        dto.setDate(entity.getDate());
        dto.setCategory(entity.getCategory());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setHide(entity.isHide());
        dto.setRelatedBudgetItemId(entity.getRelatedBudgetItem() != null ? entity.getRelatedBudgetItem().getId() : 0);
        return dto;
    }

    public void updateEntityFromDto(ExpenseEntity entity, Expense expense) {
        if(entity == null || expense == null) {
            return;
        }

        entity.setLabel(expense.getLabel());
        entity.setAmount(expense.getAmount());
        entity.setDate(expense.getDate());
        entity.setCategory(expense.getCategory());
        entity.setPaymentMethod(expense.getPaymentMethod());
        entity.setHide(expense.isHide());
    }
}
