package com.suika.bm.controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import com.suika.bm.model.product.ExpenseDateRange;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExpenseController.class);

    private final ExpenseService expenseService;

    @GetMapping()
    public ResponseEntity<List<Expense>> getExpenses(HttpServletRequest request, @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            User user = (User) request.getAttribute("user");

            List<Expense> expenseList = expenseService.getExpensesByUserIdAndInDateRange(user.getId(), startDate, endDate);

            return ResponseEntity.ok(expenseList);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @GetMapping("/dateRange")
    public ResponseEntity<ExpenseDateRange> getExpensesDateRange(HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");

            ExpenseDateRange dateRange = expenseService.getExpensesDateRangeByUser(user.getId());

            return ResponseEntity.ok(dateRange);
        } catch (ResourceNotFoundException e) {
            LOGGER.error(e.getMessage());

            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            LOGGER.error(e.getMessage());

            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PostMapping()
    public ResponseEntity<Expense> addExpense(HttpServletRequest request, @RequestBody Expense expense) {
        try {
            User user = (User) request.getAttribute("user");

            Expense savedExpense = expenseService.addExpense(expense, user.getId());

            return ResponseEntity.ok(savedExpense);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteExpenses(@RequestBody List<Long> expenseIds) {
        try {
            expenseService.deleteExpenseByIds(expenseIds);

            return ResponseEntity.noContent().build(); // 204
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PutMapping()
    public ResponseEntity<Expense> deleteExpense(@RequestBody Expense expense) {
        try {
            Expense updatedExpense = expenseService.updateExpense(expense);

            return ResponseEntity.ok(updatedExpense);
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
