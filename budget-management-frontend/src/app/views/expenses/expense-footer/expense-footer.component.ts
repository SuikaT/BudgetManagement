import { Component, inject } from "@angular/core";
import { ExpensesService } from "../expenses.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-expense-footer",
    imports: [CommonModule],
    templateUrl: "./expense-footer.component.html",
    styleUrl: "./expense-footer.component.scss",
})
export class ExpenseFooterComponent {
    private router = inject(Router);

    constructor(public _expense: ExpensesService) {}

    editExpense(event: MouseEvent) {
        if (this._expense.selectedExpenses.length > 1) {
            event.stopPropagation();
            return;
        }

        this.router.navigate(["/edit-expense"]);
    }
}
