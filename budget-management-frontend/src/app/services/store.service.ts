import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Expense } from "../model/interfaces/expense";
import { DateRange } from "../model/interfaces/DateRange";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    constructor() {}

    expenses$ = new BehaviorSubject<Expense[]>([]);

    expensesDateRange$ = new BehaviorSubject<DateRange>({ start: new Date(), end: new Date() });
}
