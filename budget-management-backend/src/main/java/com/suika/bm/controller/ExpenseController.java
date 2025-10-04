package com.suika.bm.controller;


import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.database.service.UserService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import com.suika.bm.model.product.ExpenseDateRange;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Expense>> getExpenses(@PathVariable Long userId, @RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        try {
            List<Expense> expenseList = expenseService.getExpensesByUserIdAndInDateRange(userId, startDate, endDate);

            return ResponseEntity.ok(expenseList);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @GetMapping("/{userId}/dateRange")
    public ResponseEntity<ExpenseDateRange> getExpensesDateRange(@PathVariable Long userId) {
        try {
            ExpenseDateRange dateRange = expenseService.getExpensesDateRangeByUser(userId);

            return ResponseEntity.ok(dateRange);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, @PathVariable Long userId) {
        try {
            Expense savedExpense = expenseService.addExpense(expense, userId);

            return ResponseEntity.ok(savedExpense);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteExpenses(@RequestBody List<Long> expenseIds) {
        try {
            expenseService.deleteExpenseByIds(expenseIds);

            return ResponseEntity.noContent().build(); // 204
        }  catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PutMapping()
    public ResponseEntity<Expense> deleteExpense(@RequestBody Expense expense) {
        try {
            Expense updatedExpense = expenseService.updateExpense(expense);

            return ResponseEntity.ok(updatedExpense);
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
