import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Expense } from "../model/interfaces/expense";
import { DateRange } from "../model/interfaces/DateRange";
import { BudgetItem } from "../model/interfaces/budgetItem";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    constructor() {}

    expenses$ = new BehaviorSubject<Expense[]>([]);

    localExpenses$ = new BehaviorSubject<Expense[]>([]);

    expensesDateRange$ = new BehaviorSubject<DateRange>({ start: new Date(), end: new Date() });

    budgetItems$ = new BehaviorSubject<BudgetItem[]>([]);

    localBudgetItems$ = new BehaviorSubject<BudgetItem[]>([]);

    get expenses() {
        return this.expenses$.getValue();
    }

    get localExpenses() {
        return this.localExpenses$.getValue();
    }

    get expensesDateRange() {
        return this.expensesDateRange$.getValue();
    }

    get budgetItems() {
        return this.budgetItems$.getValue();
    }

    get localBudgetItems() {
        return this.localBudgetItems$.getValue();
    }
}
