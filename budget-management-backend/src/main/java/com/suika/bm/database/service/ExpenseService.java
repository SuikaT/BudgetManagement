package com.suika.bm.database.service;

import com.suika.bm.database.UserNotFoundException;
import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.mapper.ExpenseMapper;
import com.suika.bm.database.repository.ExpenseRepository;
import com.suika.bm.database.repository.UserRepository;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final ExpenseMapper expenseMapper;


    public List<Expense> getExpensesByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return expenseRepository.findAllByUser(user)
                .stream()
                .map(expenseMapper::toDto)
                .toList();
    }

    public List<Expense> getExpensesByCategory(ExpenseCategory category) {
       return expenseRepository.findAllByCategory(category)
               .stream()
               .map(expenseMapper::toDto)
               .toList();
    }

    public Expense addExpense( Expense expense, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        ExpenseEntity expenseEntity = expenseMapper.toEntity(expense);
        expenseEntity.setUser(user);

        ExpenseEntity savedExpenseEntity = expenseRepository.save(expenseEntity);

        return expenseMapper.toDto(savedExpenseEntity);
    }
}
