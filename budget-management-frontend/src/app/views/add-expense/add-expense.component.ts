import { Component } from "@angular/core";
import { ExpenseFormComponent } from "../../components/expense-form/expense-form.component";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";
import { Router } from "@angular/router";
import { StatesService } from "../../services/states.service";

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
    ) {}

    onAdd(expense: Expense) {
        if (expense) {
            // add expense to the store without triggering the subscribes
            this._store.expenses$.getValue().push(expense);
        }

        this._states.triggerReturn$.next();
    }
}
