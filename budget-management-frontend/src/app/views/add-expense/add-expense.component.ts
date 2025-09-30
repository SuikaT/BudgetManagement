import { Component } from "@angular/core";
import { ExpenseFormComponent } from "../../components/expense-form/expense-form.component";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";
import { Router } from "@angular/router";
import { StatesService } from "../../services/states.service";
import { PersistenceService } from "../../services/persistence.service";
import { NotificationService } from "../../services/notification.service";
import { UserService } from "../../services/user.service";

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
        private _user: UserService,
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
                        // retrieve current expense list
                        const currentExpenses = this._store.expenses$.getValue();
                        // add expense to the store with the updated list
                        this._store.expenses$.next([...currentExpenses, savedExpense]);
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
}
