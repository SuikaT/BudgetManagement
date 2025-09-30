import { Component, Input } from "@angular/core";
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { Expense } from "../../../model/interfaces/expense";
import { PersistenceService } from "../../../services/persistence.service";
import { StoreService } from "../../../services/store.service";
import { NotificationService } from "../../../services/notification.service";
import { ExpensesService } from "../expenses.service";
import { LongPressDirective } from "../../../directives/long-press.directive";

@Component({
    selector: "app-expense-list",
    imports: [ExpenseItemComponent, LongPressDirective],
    templateUrl: "./expense-list.component.html",
    styleUrl: "./expense-list.component.scss",
    standalone: true,
})
export class ExpenseListComponent {
    @Input()
    expenses: Expense[] = [];

    constructor(
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _expense: ExpensesService,
    ) {}

    deleteExpense(expense: Expense) {
        if (expense && expense.id) {
            this._persistence.deleteExpense(expense).subscribe({
                next: () => {
                    this._expense.removeExpense(expense.id!);
                    this._notification.showSuccess("Expense successfully deleted.");
                },
                error: (err) => {
                    this._notification.showError("An error occurred while trying to delete the expense.");
                },
            });
        }
    }

    activateSelectMod(expense: Expense) {
        this._expense.selectMod = true;
        this._expense.addExpenseToSelection(expense);
    }
}
