import { Injectable } from "@angular/core";
import { Expense } from "../../model/interfaces/expense";
import { StoreService } from "../../services/store.service";
import { DateRange } from "../../model/interfaces/DateRange";
import { ExpenseSchedule } from "../../model/enums/expenseSchedule";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ExpenseCategory } from "../../model/enums/expenseCategory";
import { PersistenceService } from "../../services/persistence.service";
import { NotificationService } from "../../services/notification.service";
import { LocalPersistenceService } from "../../services/local-persistence.service";
import { StoreUtilsService } from "../../services/store-utils.service";

@Injectable({
    providedIn: "root",
})
export class ExpensesService {
    amount: number = 0;

    selectedExpenses: Expense[] = [];
    selectionEnabled: boolean = false;

    filterDateRange$ = new BehaviorSubject<DateRange>({
        start: this.getFirstDayOfMonth(new Date()),
        end: this.getLastDayOfMonth(new Date()),
    });

    groupingStrategy$ = new BehaviorSubject<ExpenseSchedule>(ExpenseSchedule.MONTHLY);

    expensesByCategories: Expense[] = [];

    constructor(
        private _store: StoreService,
        private _storeUtils: StoreUtilsService,
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _localPersistence: LocalPersistenceService,
    ) {
        // refresh amount on expenses update
        this._store.expenses$.subscribe((expenses) => {
            this.refreshAmount();

            this.expensesByCategories = this.buildExpensesByCategories(expenses);
        });
    }

    buildExpensesByCategories(expenses: Expense[]): Expense[] {
        if (!expenses) return [];

        const expenseByCategoryMap = new Map<ExpenseCategory, Expense>();

        expenses.forEach((e) => {
            if (!e.category || e.hide) {
                return;
            }

            const expenseByCategory = expenseByCategoryMap.get(e.category);
            if (expenseByCategory) {
                expenseByCategory.amount += e.amount;
            } else {
                expenseByCategoryMap.set(e.category, { category: e.category, label: e.category, amount: e.amount });
            }
        });

        return Array.from(expenseByCategoryMap.values());
    }

    getFirstDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    getLastDayOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    removeExpense(expenseId: number) {
        if (expenseId) {
            let expenses = this._store.expenses$.getValue().filter((e) => e.id !== expenseId);
            this.selectedExpenses = this.selectedExpenses.filter((e) => e.id !== expenseId);

            this._store.expenses$.next(expenses);
        }
    }

    removeExpenses(expenses: Expense[]) {
        expenses.forEach((e) => this.removeExpense(e.id!));
    }

    addExpenseToSelection(expense: Expense) {
        this.selectedExpenses.push(expense);
        expense.selected = true;
    }

    removeExpenseFromSelection(expense: Expense) {
        this.selectedExpenses = this.selectedExpenses.filter((e) => e.id != expense.id);
        expense.selected = false;
    }

    updateSelection(expense: Expense) {
        if (!this.selectionEnabled) return;

        if (expense.selected) {
            this.removeExpenseFromSelection(expense);
        } else {
            this.addExpenseToSelection(expense);
        }
    }

    hideSelectedExpenses(hide: boolean) {
        this.selectedExpenses?.forEach((e) => (e.hide = hide));

        this.refreshAmount();
    }

    refreshAmount() {
        const expensesIncludedInAmount = this._store.expenses$.getValue().filter((e) => !e.hide);
        this.amount = this.calculateAmount(expensesIncludedInAmount);
    }

    calculateAmount(expenses: Expense[]): any {
        let result = 0;

        expenses?.forEach((expense) => {
            result += expense.amount;
        });

        return result;
    }

    resetSelectedExpenses() {
        // update selected value
        this.selectedExpenses.forEach((e) => (e.selected = false));
        // empty array
        this.selectedExpenses = [];
    }

    deleteSelectedExpenses() {
        if (this.selectedExpenses.length > 0) {
            this._persistence.deleteExpenses(this.selectedExpenses).subscribe({
                next: () => {
                    this.removeExpenses(this.selectedExpenses);
                    this._notification.showSuccess("Expense successfully deleted.");
                },
                error: () => {
                    this._notification.showError("An error occurred while trying to delete the expense.");
                },
            });
        }
    }

    enableSelection(expense: Expense) {
        if (!this.selectionEnabled) {
            this.selectionEnabled = true;
            this.addExpenseToSelection(expense);
        }
    }

    addToLocalExpenses(expense: Expense) {
        // init localId
        expense.localId = this._storeUtils.initLocalExpenseId();

        this.updateLocalStoreAndPreferences([...this._store.localExpenses, expense]);
    }

    updateAsLocalExpense(expense: Expense) {
        let localExpenses = this._store.localExpenses;
        if (!expense.localId) {
            expense.localId = this._storeUtils.initLocalExpenseId();
        } else {
            localExpenses = localExpenses.filter((e) => e.localId != expense.localId);
        }

        this.updateLocalStoreAndPreferences([...localExpenses, expense]);
    }

    updateLocalStoreAndPreferences(expense: Expense[]) {
        // update store
        this._store.localExpenses$.next(expense);
        // update capacitor preferences with the changes
        this._localPersistence.setExpenses(expense);
    }

    get filterDateRange(): DateRange {
        return this.filterDateRange$.getValue();
    }

    get groupingStrategy(): ExpenseSchedule {
        return this.groupingStrategy$.getValue();
    }

    set groupingStrategy(value: ExpenseSchedule) {
        this.groupingStrategy$.next(value);
    }
}
