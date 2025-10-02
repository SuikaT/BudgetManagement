package com.suika.bm.controller;


import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.database.service.UserService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import com.suika.bm.model.product.ExpenseDateRange;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Controller {

    private Logger logger = LoggerFactory.getLogger(Controller.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/userById")
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/userByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/expenses/{userId}")
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

    @GetMapping("/expenses/{userId}/dateRange")
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

    @PostMapping("/expenses/{userId}")
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

    @DeleteMapping("/expenses")
    public ResponseEntity<Void> deleteExpenses(@RequestBody List<Long> expenseIds) {
        try {
            expenseService.deleteExpenseByIds(expenseIds);

            return ResponseEntity.noContent().build(); // 204
        }  catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PutMapping("/expenses")
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
