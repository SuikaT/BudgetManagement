import { Component, Input } from "@angular/core";
import { Expense } from "../../model/interfaces/expense";
import { ExpenseItemComponent } from "./expense-item/expense-item.component";

@Component({
    selector: "app-expense-list",
    imports: [ExpenseItemComponent],
    templateUrl: "./expense-list.component.html",
    styleUrl: "./expense-list.component.scss",
})
export class ExpenseListComponent {
    @Input()
    expenses: Expense[] = [];
}
