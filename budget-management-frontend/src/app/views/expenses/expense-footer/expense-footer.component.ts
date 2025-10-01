import { Component } from "@angular/core";
import { ExpensesService } from "../expenses.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-expense-footer",
    imports: [CommonModule],
    templateUrl: "./expense-footer.component.html",
    styleUrl: "./expense-footer.component.scss",
})
export class ExpenseFooterComponent {
    constructor(public _expense: ExpensesService) {}

    deleteExpenses() {
        this._expense.removeExpenses(this._expense.selectedExpenses);
    }
    editExpense(event: MouseEvent) {
        if (this._expense.selectedExpenses.length > 1) {
            event.stopPropagation();
            return;
        }

        //TODO edit
    }

    hideExpenses() {
        this._expense.hideExpenses(this._expense.selectedExpenses, true);
    }
}
