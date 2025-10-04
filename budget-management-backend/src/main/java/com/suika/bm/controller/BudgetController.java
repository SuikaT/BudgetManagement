package com.suika.bm.controller;


import com.suika.bm.database.service.BudgetService;
import com.suika.bm.exception.ExpenseNotFoundException;
import com.suika.bm.exception.ResourceNotFoundException;
import com.suika.bm.model.product.BudgetItem;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/budget")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping("/budgetItems/{userId}")
    public ResponseEntity<List<BudgetItem>> getBudgetItems(@PathVariable Long userId) {
        try {
            List<BudgetItem> budgetItems = budgetService.getBudgetItemsByUserId(userId);

            return ResponseEntity.ok(budgetItems);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PostMapping("budgetItems/{userId}")
    public ResponseEntity<BudgetItem> addExpense(@RequestBody BudgetItem budgetItem, @PathVariable Long userId) {
        try {
            BudgetItem savedBudgetItem = budgetService.addBudgetItem(budgetItem, userId);

            return ResponseEntity.ok(savedBudgetItem);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @DeleteMapping("budgetItems")
    public ResponseEntity<Void> deleteBudgetItems(@RequestBody List<Long> budgetItemIds) {
        try {
            budgetService.deleteBudgetItemByIds(budgetItemIds);

            return ResponseEntity.noContent().build(); // 204
        }  catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }

    @PutMapping("budgetItems")
    public ResponseEntity<BudgetItem> updateBudgetItem(@RequestBody BudgetItem budgetItem) {
        try {
            BudgetItem updatedBudgetItem = budgetService.updateBudgetItem(budgetItem);

            return ResponseEntity.ok(updatedBudgetItem);
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build(); // 500
        }
    }
}
