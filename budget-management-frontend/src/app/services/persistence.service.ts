import { Injectable } from "@angular/core";
import { Expense } from "../model/interfaces/expense";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { first } from "rxjs/internal/operators/first";
import { map, Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { DateRange } from "../model/interfaces/DateRange";

@Injectable({
    providedIn: "root",
})
export class PersistenceService {
    constructor(private http: HttpClient) {}

    getExpensesDateRange(userId: number): Observable<DateRange> {
        return this.http.get<{ start: string; end: string }>(`${environment.apiUrl}/expenses/${userId}/dateRange`).pipe(
            first(),
            map((dateRange: { start: string; end: string }) => ({
                start: new Date(dateRange.start),
                end: new Date(dateRange.end),
            })),
        );
    }

    getExpenses(userId: number, dateRange: DateRange): Observable<Expense[]> {
        const formatedStartDate = formatDate(dateRange.start, "yyyy-MM-dd", "en-US");
        const formatedEndDate = formatDate(dateRange.end, "yyyy-MM-dd", "en-US");

        return this.http.get<Expense[]>(`${environment.apiUrl}/expenses/${userId}`, { params: { startDate: formatedStartDate, endDate: formatedEndDate } }).pipe(first());
    }

    addExpense(expense: Expense, userId: number): Observable<Expense> {
        return this.http.post<Expense>(`${environment.apiUrl}/expenses/${userId}`, expense).pipe(first());
    }

    deleteExpense(expense: Expense): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/expenses/${expense?.id}`).pipe(first());
    }

    updateExpense(expense: Expense): Observable<Expense> {
        return this.http.put<Expense>(`${environment.apiUrl}/expenses`, expense).pipe(first());
    }
}
