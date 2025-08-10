import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Expense } from "../model/interfaces/expense";

@Injectable({
    providedIn: "root",
})
export class StoreService {
    constructor() {}

    expenses$ = new BehaviorSubject<Expense[]>([]);
}
