import { Component, HostListener, Input } from "@angular/core";
import { Expense } from "../../../../model/interfaces/expense";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { ExpensesService } from "../../expenses.service";

@Component({
    selector: "app-expense-item",
    imports: [MatCheckboxModule],
    templateUrl: "./expense-item.component.html",
    styleUrl: "./expense-item.component.scss",
    standalone: true,
})
export class ExpenseItemComponent {
    constructor(public _expense: ExpensesService) {}

    @Input()
    expense?: Expense;
}
