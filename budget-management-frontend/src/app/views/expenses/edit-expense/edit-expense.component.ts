import { Component, inject, OnInit } from "@angular/core";
import { ExpenseFormComponent } from "../../../components/expense-form/expense-form.component";
import { Expense } from "../../../model/interfaces/expense";
import { PersistenceService } from "../../../services/persistence.service";
import { NotificationService } from "../../../services/notification.service";
import { StoreService } from "../../../services/store.service";
import { ExpensesService } from "../expenses.service";
import { StatesService } from "../../../services/states.service";

@Component({
    selector: "app-edit-expense",
    imports: [ExpenseFormComponent],
    templateUrl: "./edit-expense.component.html",
    styleUrl: "./edit-expense.component.scss",
})
export class EditExpenseComponent implements OnInit {
    expense: Expense | undefined;

    constructor(
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _store: StoreService,
        private _expense: ExpensesService,
        private _states: StatesService,
    ) {}

    ngOnInit(): void {
        // edit is available only when strictly one expense is selected
        if (this._expense.selectedExpenses.length != 1) {
            // navigate back to expenses
            this._states.triggerReturn$.next();
        }

        this.expense = structuredClone(this._expense.selectedExpenses[0]);
    }

    onApply(expense: Expense): void {
        this._persistence.updateExpense(expense).subscribe({
            next: (updatedExpense) => {
                if (updatedExpense) {
                    this.updateStoreExpense(updatedExpense);

                    this._expense.resetSelectedExpenses();

                    // navigate back to expenses
                    this._states.triggerReturn$.next();
                } else {
                    this._expense.updateAsLocalExpense(expense);
                    this._notification.showError("An error occurred, expense changes saved locally.");
                }
            },
            error: () => {
                this._expense.updateAsLocalExpense(expense);
                this._notification.showError("An error occurred, expense changes saved locally.");
            },
        });
    }

    private updateStoreExpense(updatedExpense: Expense) {
        if (updatedExpense) {
            let expenses = this._store.expenses$.getValue();
            expenses = expenses.filter((e) => e.id != updatedExpense.id);
            expenses.push(updatedExpense);

            this._store.expenses$.next(expenses);
        }
    }
}
