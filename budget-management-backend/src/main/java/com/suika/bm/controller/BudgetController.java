package com.suika.bm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suika.bm.database.service.BudgetService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.model.network.User;
import com.suika.bm.model.product.BudgetItem;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/budget")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping("/budgetItems")
    public ResponseEntity<List<BudgetItem>> getBudgetItems(HttpServletRequest request) {
        try {
            User user = (User) request.getAttribute("user");

            List<BudgetItem> budgetItems = budgetService.getBudgetItemsByUserId(user.getId());

            return ResponseEntity.ok(budgetItems);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PostMapping("budgetItems")
    public ResponseEntity<BudgetItem> addExpense(HttpServletRequest request, @RequestBody BudgetItem budgetItem) {
        try {
            User user = (User) request.getAttribute("user");

            BudgetItem savedBudgetItem = budgetService.addBudgetItem(budgetItem, user.getId());

            return ResponseEntity.ok(savedBudgetItem);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @DeleteMapping("budgetItems")
    public ResponseEntity<Void> deleteBudgetItems(@RequestBody List<Long> budgetItemIds) {
        try {
            budgetService.deleteBudgetItemByIds(budgetItemIds);

            return ResponseEntity.noContent().build(); // 204
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PutMapping("budgetItems")
    public ResponseEntity<BudgetItem> updateBudgetItem(@RequestBody BudgetItem budgetItem) {
        try {
            BudgetItem updatedBudgetItem = budgetService.updateBudgetItem(budgetItem);

            return ResponseEntity.ok(updatedBudgetItem);
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
