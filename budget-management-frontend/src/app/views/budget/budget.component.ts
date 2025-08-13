import { Component, OnInit } from "@angular/core";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseCardComponent } from "./expense-card/expense-card.component";
import { BudgetToolbarComponent } from "./budget-toolbar/budget-toolbar.component";
import { StoreService } from "../../services/store.service";
import { Expense } from "../../model/interfaces/expense";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: "app-budget",
    imports: [CommonModule, ExpenseListComponent, ExpenseCardComponent, BudgetToolbarComponent, HeaderComponent],
    templateUrl: "./budget.component.html",
    styleUrl: "./budget.component.scss",
    standalone: true,
})
export class BudgetComponent implements OnInit {
    constructor(public _store: StoreService) {}

    ngOnInit(): void {
        const expenses: Expense[] = [
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
            { label: "test", amount: 10, date: new Date() },
        ];
        this._store.expenses$.next(expenses);
    }
}
