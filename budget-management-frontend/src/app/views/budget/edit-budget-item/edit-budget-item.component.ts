import { Component } from "@angular/core";
import { BudgetItem } from "../../../model/interfaces/budgetItem";
import { PersistenceService } from "../../../services/persistence.service";
import { NotificationService } from "../../../services/notification.service";
import { StoreService } from "../../../services/store.service";
import { ExpensesService } from "../../expenses/expenses.service";
import { StatesService } from "../../../services/states.service";
import { BudgetFormComponent } from "../../../components/budget-form/budget-form.component";

@Component({
    selector: "app-edit-budget-item",
    imports: [BudgetFormComponent],
    templateUrl: "./edit-budget-item.component.html",
    styleUrl: "./edit-budget-item.component.scss",
})
export class EditBudgetItemComponent {
    budgetItem: BudgetItem | undefined;

    constructor(
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _store: StoreService,
        private _expense: ExpensesService,
        private _states: StatesService,
    ) {}

    ngOnInit(): void {
        if (this._store.budgetItems.length == 0) {
            // navigate back to expenses
            this._states.triggerReturn$.next();
        }
        const index = 0;

        this.budgetItem = structuredClone(this._store.budgetItems[index]);
    }

    onApply(budgetItem: BudgetItem): void {
        this._persistence.updateBudgetItem(budgetItem).subscribe({
            next: (updatedBudgetItem) => {
                this.updateStoreBudgetItem(updatedBudgetItem);

                this._expense.resetSelectedExpenses();

                // navigate back to expenses
                this._states.triggerReturn$.next();
            },
            error: () => {
                this._notification.showError("An error occurred.");
            },
        });
    }

    private updateStoreBudgetItem(updatedBudgetItem: BudgetItem) {
        if (updatedBudgetItem) {
            let budgetItems = this._store.budgetItems.filter((e) => e.id != updatedBudgetItem.id);
            budgetItems.push(updatedBudgetItem);

            this._store.budgetItems$.next(budgetItems);
        }
    }
}
