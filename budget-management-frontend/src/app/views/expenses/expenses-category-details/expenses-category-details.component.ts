import { Component, inject, OnInit } from "@angular/core";
import { Expense } from "../../../model/interfaces/expense";
import { ExpensesService } from "../expenses.service";
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "../../../services/store.service";
import { combineLatest } from "rxjs";
import { ExpenseListComponent } from "../expense-list/expense-list.component";

@Component({
    selector: "app-expenses-category-details",
    imports: [ExpenseListComponent],
    templateUrl: "./expenses-category-details.component.html",
    styleUrl: "./expenses-category-details.component.scss",
})
export class ExpensesCategoryDetailsComponent implements OnInit {
    public _expense = inject(ExpensesService);
    private _store = inject(StoreService);
    private route = inject(ActivatedRoute);

    categoryExpenses: Expense[] = [];

    ngOnInit(): void {
        combineLatest([this.route.paramMap, this._store.expenses$]).subscribe(([params, expenses]) => {
            const category = params.get("category");

            if (category) {
                // display expenses of the category in params
                this.categoryExpenses = this._store.expenses$.getValue().filter((e) => e.category == category);
            }
        });
    }
}
