import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { filter } from "rxjs/internal/operators/filter";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { PersistenceService } from "./persistence.service";
import { StoreService } from "./store.service";
import { catchError, combineLatest, first, forkJoin, from, of, skip } from "rxjs";
import { ExpensesService } from "../views/expenses/expenses.service";
import { Preferences } from "@capacitor/preferences";
import { Expense } from "../model/interfaces/expense";
import { BudgetItem } from "../model/interfaces/budgetItem";
import { StoreUtilsService } from "./store-utils.service";

@Injectable({
    providedIn: "root",
})
export class AcquisitionService {
    constructor(
        private _auth: AuthService,
        private _persistence: PersistenceService,
        private _store: StoreService,
        private _expense: ExpensesService,
    ) {
        this.initAcquisiton();
    }

    async initAcquisiton() {
        await this.initLocalData();

        this.initServerDataAcquisition();
    }
    async initLocalData() {
        await this.retrieveLocalExpenses();
        await this.retrieveLocalBudgetItems();
    }

    private initServerDataAcquisition() {
        this._auth.currentUser$
            .pipe(
                filter((user) => !!user), // Only proceed when user exists
                // Parallel calls
                switchMap((user) => {
                    return forkJoin({
                        expenses: this._persistence.getExpensesDateRange(user.id).pipe(
                            catchError((err) => {
                                console.error("Expenses date range acquisition failed", err);
                                // empty array on error
                                return of({ start: new Date(), end: new Date() });
                            }),
                        ),
                        budgetItems: this._persistence.getBudgetItems(user.id).pipe(
                            catchError((err) => {
                                console.error("BudgetItems acquisition failed", err);
                                // empty array on error
                                return of([]);
                            }),
                        ), // <-- second server call
                    });
                }),
            )
            .subscribe({
                next: ({ expenses, budgetItems }) => {
                    this._store.expensesDateRange$.next(expenses);
                    this._store.budgetItems$.next(budgetItems);
                },
                error: (error) => {
                    console.error("Unexpected acquisition error:", error);
                },
            });

        // retrieve expenses on date range selection change
        combineLatest([this._auth.currentUser$, this._expense.filterDateRange$])
            .pipe(filter(([user]) => !!user))
            .subscribe(([user, dateRange]) => {
                this._persistence.getExpenses(user!.id, dateRange).subscribe({
                    next: (expenses) => {
                        this._store.expenses$.next(expenses);
                    },
                    error: (error) => {
                        console.error("Expense acquisition failed data:", error);
                    },
                });
            });
    }

    async retrieveLocalExpenses() {
        const { value } = await Preferences.get({ key: "expenses" });

        const localExpenses = value ? (JSON.parse(value) as Expense[]) : [];

        this._store.localExpenses$.next(localExpenses);
        this._store.expenses$.next([...this._store.expenses, ...localExpenses]);
    }

    async retrieveLocalBudgetItems() {
        const { value } = await Preferences.get({ key: "budgetItems" });

        const localBudgetItems = value ? (JSON.parse(value) as BudgetItem[]) : [];

        this._store.localBudgetItems$.next(localBudgetItems);
        this._store.budgetItems$.next([...this._store.budgetItems, ...localBudgetItems]);
    }
}
