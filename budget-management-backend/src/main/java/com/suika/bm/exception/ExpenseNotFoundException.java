package com.suika.bm.exception;

public class ExpenseNotFoundException extends ResourceNotFoundException {
  public ExpenseNotFoundException(Long expenseId) {
    super("Expense not found with id: " + expenseId);
  }
}
