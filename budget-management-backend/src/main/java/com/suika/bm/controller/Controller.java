package com.suika.bm.controller;


import com.suika.bm.database.entity.ExpenseEntity;
import com.suika.bm.database.entity.UserEntity;
import com.suika.bm.database.service.ExpenseService;
import com.suika.bm.database.service.UserService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.UserNotFoundException;
import com.suika.bm.model.enums.ExpenseCategory;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.Expense;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @GetMapping("/test")
    public UserEntity test() {
        UserEntity user = new UserEntity();

        user.setId(2L);
        user.setEmail("test");
        user.setFirstname("test");
        user.setLastname("test");


        return user;
    }

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
    public ResponseEntity<List<Expense>> getExpenses(@PathVariable Long userId) {
        try {
            List<Expense> expenseList = expenseService.getExpensesByUserId(userId);

            return ResponseEntity.ok(expenseList);
        } catch (UserNotFoundException e) {
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
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @DeleteMapping("/expenses/{expenseId}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long expenseId) {
        try {
            System.out.println(expenseId);
            expenseService.deleteExpenseById(expenseId);

            return ResponseEntity.noContent().build(); // 204
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
