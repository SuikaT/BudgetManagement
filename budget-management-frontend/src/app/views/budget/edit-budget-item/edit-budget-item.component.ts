import { Component } from "@angular/core";
import { BudgetItem } from "../../../model/interfaces/budgetItem";
import { PersistenceService } from "../../../services/persistence.service";
import { NotificationService } from "../../../services/notification.service";
import { StoreService } from "../../../services/store.service";
import { ExpensesService } from "../../expenses/expenses.service";
import { StatesService } from "../../../services/states.service";
import { BudgetFormComponent } from "../../../components/budget-form/budget-form.component";
import { ActivatedRoute } from "@angular/router";

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
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        if (this._store.budgetItems.length == 0) {
            // navigate back to expenses
            this._states.triggerReturn$.next();
        }

        this.route.paramMap.subscribe((params) => {
            // retrieve id from url params
            const id = params.get("id");
            if (id) {
                const foundBudgetItem = this._store.budgetItems.find((b) => b.id == Number(id));
                this.budgetItem = foundBudgetItem ? structuredClone(foundBudgetItem) : undefined;
            }
        });
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
