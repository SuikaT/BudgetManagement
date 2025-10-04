package com.suika.bm.exception;

public class BudgetItemNotFoundException extends ResourceNotFoundException {
  public BudgetItemNotFoundException(Long budgetItemId) {
    super("BudgetItem not found with id: " + budgetItemId);
  }
}
