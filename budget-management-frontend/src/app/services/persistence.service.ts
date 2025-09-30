import { Injectable } from "@angular/core";
import { Expense } from "../model/interfaces/expense";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { first } from "rxjs/internal/operators/first";

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    constructor(private http: HttpClient) {}

    addExpense(expense: Expense, userId: number) {
        const params = new HttpParams().set("userId", userId.toString());

        return this.http.post<Expense>(environment.apiUrl + "addExpense", expense, { params }).pipe(first());
    }
}
