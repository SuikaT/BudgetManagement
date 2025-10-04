import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ExpenseFormComponent } from "../../../components/expense-form/expense-form.component";
import { StoreService } from "../../../services/store.service";
import { StatesService } from "../../../services/states.service";
import { PersistenceService } from "../../../services/persistence.service";
import { NotificationService } from "../../../services/notification.service";
import { AuthService } from "../../../services/auth.service";
import { ExpensesService } from "../expenses.service";
import { Expense } from "../../../model/interfaces/expense";

@Component({
    selector: "app-add-expense",
    imports: [ExpenseFormComponent],
    templateUrl: "./add-expense.component.html",
    styleUrl: "./add-expense.component.scss",
})
export class AddExpenseComponent {
    constructor(
        private _store: StoreService,
        private _states: StatesService,
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _user: AuthService,
        private _expense: ExpensesService,
    ) {}

    onAdd(expense: Expense) {
        if (expense) {
            const user = this._user.currentUser$.getValue();
            if (!user) {
                this._notification.showError("Log in to add an expense.");
                return;
            }

            // add expense to database
            this._persistence.addExpense(expense, user.id).subscribe({
                next: (savedExpense) => {
                    if (savedExpense) {
                        this.actualizeStore(savedExpense);
                        // notify user
                        this._notification.showSuccess("Expense successfully added.");
                        // navigate back to expense page
                        this._states.triggerReturn$.next();
                    } else {
                        this._notification.showError("An error occurred, expense could not be added.");
                    }
                },
                error: (err) => {
                    this._notification.showError("An error occurred, expense could not be added.");
                },
            });
        }
    }

    private actualizeStore(savedExpense: Expense) {
        // do not' add an expense outside of the selected date range in the store
        if (savedExpense.date && savedExpense.date >= this._expense.filterDateRange.start && savedExpense.date <= this._expense.filterDateRange.end) {
            // retrieve actual expenses
            const currentExpenses = this._store.expenses$.getValue();
            // add expense to the store with the updated list
            this._store.expenses$.next([...currentExpenses, savedExpense]);
        }
    }
}
