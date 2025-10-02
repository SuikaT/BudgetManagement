import { Component, inject } from "@angular/core";
import { ExpenseCardComponent } from "../expense-card/expense-card.component";
import { ExpenseListComponent } from "../expense-list/expense-list.component";
import { ExpensesService } from "../expenses.service";
import { Expense } from "../../../model/interfaces/expense";
import { Router } from "@angular/router";

@Component({
    selector: "app-expenses-categories",
    imports: [ExpenseCardComponent, ExpenseListComponent],
    templateUrl: "./expenses-categories.component.html",
    styleUrl: "./expenses-categories.component.scss",
})
export class ExpensesCategoriesComponent {
    public _expense = inject(ExpensesService);
    private router = inject(Router);

    onCategoryClick(categoryExpense: Expense) {
        if (categoryExpense?.category) {
            this.router.navigate(["/expenses", categoryExpense.category]);
        }
    }
}
