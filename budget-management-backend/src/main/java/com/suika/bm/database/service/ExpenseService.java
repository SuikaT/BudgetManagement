package com.suika.bm.database.service;

import com.suika.bm.database.repository.ExpenseRepository;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.product.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getExpensesByCategory(ExpenseCategory category) {
       return expenseRepository.findAllByCategory(category)
               .stream()
               .map(Expense::new)
               .toList();
    }
}
