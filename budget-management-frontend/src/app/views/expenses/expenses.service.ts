import { Injectable } from "@angular/core";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";

@Injectable({
    providedIn: "root",
})
export class ExpensesService {
    constructor(private _store: StoreService) {}

    removeExpense(expenseId: number) {
        if (expenseId) {
            let expenses = this._store.expenses$.getValue().filter((exp) => exp.id !== expenseId);

            this._store.expenses$.next(expenses);
        }
    }
}
