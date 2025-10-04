import { Component } from "@angular/core";
import { BudgetFormComponent } from "../../../components/budget-form/budget-form.component";
import { BudgetItem } from "../../../model/interfaces/budgetItem";
import { StoreService } from "../../../services/store.service";
import { StatesService } from "../../../services/states.service";
import { PersistenceService } from "../../../services/persistence.service";
import { NotificationService } from "../../../services/notification.service";
import { AuthService } from "../../../services/auth.service";
import { ExpensesService } from "../../expenses/expenses.service";

@Component({
    selector: "app-add-budget-item",
    imports: [BudgetFormComponent],
    templateUrl: "./add-budget-item.component.html",
    styleUrl: "./add-budget-item.component.scss",
})
export class AddBudgetItemComponent {
    constructor(
        private _store: StoreService,
        private _states: StatesService,
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _user: AuthService,
    ) {}

    onAdd(budgetItem: BudgetItem) {
        if (budgetItem) {
            const user = this._user.currentUser$.getValue();
            if (!user) {
                this._notification.showError("Log in to add an expense.");
                return;
            }

            // add expense to database
            this._persistence.addBudgetItem(budgetItem, user.id).subscribe({
                next: (savedBudgetItem) => {
                    if (savedBudgetItem) {
                        // actualize store
                        this._store.budgetItems$.next([...this._store.budgetItems, savedBudgetItem]);
                        // notify user
                        this._notification.showSuccess("Expense successfully added.");
                        // navigate back to expense page
                        this._states.triggerReturn$.next();
                    } else {
                        this._notification.showError("An error occurred, expense could not be added.");
                    }
                },
                error: () => {
                    this._notification.showError("An error occurred, expense could not be added.");
                },
            });
        }
    }
}
