import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { filter } from "rxjs/internal/operators/filter";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { PersistenceService } from "./persistence.service";
import { StoreService } from "./store.service";
import { catchError, combineLatest, first, forkJoin, of, skip } from "rxjs";
import { ExpensesService } from "../views/expenses/expenses.service";

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
        this.initializeDataAcquisition();
    }

    private initializeDataAcquisition() {
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
                console.log(user);
                if (user) {
                    this._persistence.getExpenses(user.id, dateRange).subscribe({
                        next: (expenses) => {
                            this._store.expenses$.next(expenses);
                        },
                        error: (error) => {
                            console.error("Expense acquisition failed data:", error);
                        },
                    });
                }
            });
    }
}
