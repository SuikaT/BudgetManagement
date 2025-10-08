import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";
import { Expense } from "../model/interfaces/expense";
import { BudgetItem } from "../model/interfaces/budgetItem";
import { Preferences } from "@capacitor/preferences";

@Injectable({
    providedIn: "root",
})
export class StoreUtilsService {
    constructor(private _store: StoreService) {}

    initLocalExpenseId() {
        const existingLocalIds = this._store.localExpenses?.map((e) => e.localId).filter((id) => id !== undefined);

        return this.initIdFromExistingIds(existingLocalIds);
    }

    initLocalBudgetItemId() {
        const existingLocalIds = this._store.localBudgetItems?.map((b) => b.localId).filter((id) => id !== undefined);

        return this.initIdFromExistingIds(existingLocalIds);
    }

    initIdFromExistingIds(existingIds: number[]): number {
        if (existingIds && existingIds.length > 0) {
            return Math.max(...existingIds) + 1;
        }

        return 1;
    }
}
