import { Component, Input } from "@angular/core";
import { Expense } from "../../../../model/interfaces/expense";

@Component({
    selector: "app-expense-item",
    imports: [],
    templateUrl: "./expense-item.component.html",
    styleUrl: "./expense-item.component.scss",
    standalone: true,
})
export class ExpenseItemComponent {
    @Input()
    expense?: Expense;
}
