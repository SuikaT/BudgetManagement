import { Component, Input } from "@angular/core";
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { Expense } from "../../../model/interfaces/expense";

@Component({
    selector: "app-expense-list",
    imports: [ExpenseItemComponent],
    templateUrl: "./expense-list.component.html",
    styleUrl: "./expense-list.component.scss",
    standalone: true,
})
export class ExpenseListComponent {
    @Input()
    expenses: Expense[] = [];
}
