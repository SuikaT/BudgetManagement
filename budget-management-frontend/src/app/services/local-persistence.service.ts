import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { from, map, Observable } from 'rxjs';
import { StorageKey } from '../model/enums/storageKey';
import { BudgetItem } from '../model/interfaces/budgetItem';
import { Expense } from '../model/interfaces/expense';

@Injectable({
    providedIn: 'root',
})
export class LocalPersistenceService {
    constructor() {}

    setPreference(key: string, value: string): Promise<void> {
        return Preferences.set({ key, value });
    }

    getPreference(key: string): Observable<GetResult> {
        return from(Preferences.get({ key }));
    }

    setSecure(key: string, value: string): Promise<{ value: boolean }> {
        return SecureStoragePlugin.set({ key, value });
    }

    getSecure(key: string): Promise<{ value: string }> {
        return SecureStoragePlugin.get({ key });
    }

    /* EXPENSES */
    getExpenses(): Observable<Expense[]> {
        return this.getPreference(StorageKey.EXPENSES).pipe(
            map(({ value }) => {
                try {
                    return value ? (JSON.parse(value) as Expense[]) : [];
                } catch {
                    console.warn('Invalid expenses JSON in Preferences');
                    return [];
                }
            }),
        );
    }

    setExpenses(expenses: Expense[]): void {
        this.setPreference(StorageKey.EXPENSES, JSON.stringify(expenses));
    }

    /* BUDGET ITEMS */
    getBudgetItems(): Observable<BudgetItem[]> {
        return this.getPreference(StorageKey.BUDGET_ITEMS).pipe(
            map(({ value }) => {
                try {
                    return value ? (JSON.parse(value) as BudgetItem[]) : [];
                } catch {
                    console.warn('Invalid budgetItems JSON in Preferences');
                    return [];
                }
            }),
        );
    }

    setBudgetItems(budgetItems: BudgetItem[]): void {
        this.setPreference(StorageKey.BUDGET_ITEMS, JSON.stringify(budgetItems));
    }
}
