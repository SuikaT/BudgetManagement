import { Injectable } from "@angular/core";
import { Expense } from "../model/interfaces/expense";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { first } from "rxjs/internal/operators/first";
import { from, map, Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { DateRange } from "../model/interfaces/DateRange";
import { BudgetItem } from "../model/interfaces/budgetItem";
import { Preferences } from "@capacitor/preferences";

@Injectable({
    providedIn: "root",
})
export class LocalPersistenceService {
    constructor() {}

    /* EXPENSES */
    getExpenses(): Observable<Expense[]> {
        return from(Preferences.get({ key: "expenses" })).pipe(
            map(({ value }) => {
                try {
                    return value ? (JSON.parse(value) as Expense[]) : [];
                } catch {
                    console.warn("Invalid expenses JSON in Preferences");
                    return [];
                }
            }),
        );
    }

    setExpenses(expenses: Expense[]): void {
        Preferences.set({
            key: "expenses",
            value: JSON.stringify(expenses),
        });
    }

    /* BUDGET ITEMS */
    getBudgetItems(): Observable<BudgetItem[]> {
        return from(Preferences.get({ key: "budgetItems" })).pipe(
            map(({ value }) => {
                try {
                    return value ? (JSON.parse(value) as BudgetItem[]) : [];
                } catch {
                    console.warn("Invalid budgetItems JSON in Preferences");
                    return [];
                }
            }),
        );
    }

    setBudgetItems(budgetItems: BudgetItem[]): void {
        Preferences.set({
            key: "budgetItems",
            value: JSON.stringify(budgetItems),
        });
    }
}
