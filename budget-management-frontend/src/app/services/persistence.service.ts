import { Injectable } from "@angular/core";
import { Expense } from "../model/interfaces/expense";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { first } from "rxjs/internal/operators/first";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    constructor(private http: HttpClient) {}

    getExpenses(userId: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${environment.apiUrl}/expenses/${userId}`).pipe(first());
    }

    addExpense(expense: Expense, userId: number): Observable<Expense> {
        return this.http.post<Expense>(`${environment.apiUrl}/expenses/${userId}`, expense).pipe(first());
    }

    deleteExpense(expense: Expense): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/expenses/${expense?.id}`).pipe(first());
    }
}
