import { Injectable } from "@angular/core";
import { Expense } from "../model/interfaces/expense";

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    constructor() {}

    addExpense(expense: Expense) {}
}
