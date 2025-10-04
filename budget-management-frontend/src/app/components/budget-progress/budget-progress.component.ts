import { Component, inject, Input, OnInit } from "@angular/core";
import { BudgetItem } from "../../model/interfaces/budgetItem";
import { StoreService } from "../../services/store.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-budget-progress",
    imports: [CommonModule],
    templateUrl: "./budget-progress.component.html",
    styleUrl: "./budget-progress.component.scss",
})
export class BudgetProgressComponent implements OnInit {
    private _store = inject(StoreService);
    @Input()
    budgetItem!: BudgetItem;

    percent: number = 0;

    ngOnInit(): void {
        this._store.expenses$.subscribe((expenses) => {
            // find all expenses related to this budget item
            const relatedExpenses = expenses.filter((e) => e.relatedBudgetItemId == this.budgetItem.id);

            const spent = relatedExpenses.reduce((accumulator, current) => accumulator + (current.amount ?? 0), 0);

            this.percent = Math.floor((spent / this.budgetItem.targetAmount) * 100);
        });
    }
}
