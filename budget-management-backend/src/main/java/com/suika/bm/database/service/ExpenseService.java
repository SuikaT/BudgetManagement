package com.suika.bm.database.service;

import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.mapper.ExpenseMapper;
import com.suika.bm.database.repository.ExpenseRepository;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.product.Expense;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;

    @Transactional
    public List<Expense> getExpensesByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return expenseRepository.findAllByUser(user)
                .stream()
                .map(expenseMapper::toDto)
                .toList();
    }

    @Transactional
    public List<Expense> getExpensesByCategory(ExpenseCategory category) {
       return expenseRepository.findAllByCategory(category)
               .stream()
               .map(expenseMapper::toDto)
               .toList();
    }

    @Transactional
    public Expense addExpense( Expense expense, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ExpenseEntity expenseEntity = expenseMapper.toEntity(expense);
        expenseEntity.setUser(user);

        ExpenseEntity savedExpenseEntity = expenseRepository.save(expenseEntity);

        return expenseMapper.toDto(savedExpenseEntity);
    }

    @Transactional
    public void deleteExpenseById(Long expenseId) {
        if(!expenseRepository.existsById(expenseId)) {
            throw new ExpenseNotFoundException(expenseId);
        }

        expenseRepository.deleteById(expenseId);
    }

    @Transactional
    public Expense updateExpense(Expense expense) {
        if(expense == null ) {
            throw new ExpenseNotFoundException(null);
        }

        ExpenseEntity entityToUpdate = expenseRepository.findById(expense.getId())
                .orElseThrow(() -> new ExpenseNotFoundException(expense.getId()));

        expenseMapper.updateEntityFromDto(entityToUpdate, expense);

        ExpenseEntity updatedEntity = expenseRepository.save(entityToUpdate);

        return expenseMapper.toDto(updatedEntity);
    }
}
