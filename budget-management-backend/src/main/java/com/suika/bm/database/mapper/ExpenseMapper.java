package com.suika.bm.database.mapper;

import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.model.product.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {
    public ExpenseEntity toEntity(Expense dto) {
        if (dto == null) return null;

        ExpenseEntity entity = new ExpenseEntity();
        entity.setId(dto.getId());
        entity.setLabel(dto.getLabel());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
        entity.setCategory(dto.getCategory());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setHide(dto.isHide());
        entity.setAutoAdded(dto.isAutoAdded());

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
        dto.setAutoAdded(entity.isAutoAdded());
        return dto;
    }

    public void updateEntityFromDto(ExpenseEntity entity, Expense dto) {
        if(entity == null || dto == null) {
            return;
        }

        entity.setLabel(dto.getLabel());
        entity.setAmount(dto.getAmount());
        entity.setDate(dto.getDate());
        entity.setCategory(dto.getCategory());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setHide(dto.isHide());
        entity.setAutoAdded(dto.isAutoAdded());
    }
}
