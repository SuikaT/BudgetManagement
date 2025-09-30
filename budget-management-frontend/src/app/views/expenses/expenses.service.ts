import { Injectable } from "@angular/core";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";

@Injectable({
    providedIn: "root",
})
export class ExpensesService {
    selectedExpenses: Expense[] = [];
    selectMod: boolean = false;

    constructor(private _store: StoreService) {}

    removeExpense(expenseId: number) {
        if (expenseId) {
            let expenses = this._store.expenses$.getValue().filter((exp) => exp.id !== expenseId);

            this._store.expenses$.next(expenses);
        }
    }

    addExpenseToSelection(expense: Expense) {
        this.selectedExpenses.push(expense);
        expense.selected = true;
    }

    removeExpenseFromSelection(expense: Expense) {
        this.selectedExpenses = this.selectedExpenses.filter((e) => e.id != expense.id);
        expense.selected = false;

        console.log(expense);
    }

    updateSelection(expense: Expense) {
        if (expense.selected) {
            this.addExpenseToSelection(expense);
        } else {
            this.removeExpenseFromSelection(expense);
        }
    }
}
