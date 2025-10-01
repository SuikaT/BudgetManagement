import { Injectable } from "@angular/core";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";

@Injectable({
    providedIn: "root",
})
export class ExpensesService {
    amount: number = 0;

    selectedExpenses: Expense[] = [];
    selectionMod: boolean = false;

    constructor(private _store: StoreService) {}

    removeExpense(expenseId: number) {
        if (expenseId) {
            let expenses = this._store.expenses$.getValue().filter((e) => e.id !== expenseId);
            this.selectedExpenses = this.selectedExpenses.filter((e) => e.id !== expenseId);

            this._store.expenses$.next(expenses);
        }
    }

    removeExpenses(expenses: Expense[]) {
        expenses.forEach((e) => this.removeExpense(e.id!));
    }

    addExpenseToSelection(expense: Expense) {
        this.selectedExpenses.push(expense);
        expense.selected = true;
    }

    removeExpenseFromSelection(expense: Expense) {
        this.selectedExpenses = this.selectedExpenses.filter((e) => e.id != expense.id);
        expense.selected = false;
    }

    updateSelection(expense: Expense) {
        if (expense.selected) {
            this.removeExpenseFromSelection(expense);
        } else {
            this.addExpenseToSelection(expense);
        }
    }

    hideExpenses(expenses: Expense[], hide: boolean) {
        expenses?.forEach((e) => (e.hide = hide));

        this.refreshAmount();
    }

    refreshAmount() {
        const expensesIncludedInAmount = this._store.expenses$.getValue().filter((e) => !e.hide);
        this.amount = this.calculateAmount(expensesIncludedInAmount);
    }

    calculateAmount(expenses: Expense[]): any {
        let result = 0;

        expenses?.forEach((expense) => {
            result += expense.amount;
        });

        return result;
    }

    resetSelectedExpenses() {
        // update selected value
        this.selectedExpenses.forEach((e) => (e.selected = false));
        // empty array
        this.selectedExpenses = [];
    }
}
