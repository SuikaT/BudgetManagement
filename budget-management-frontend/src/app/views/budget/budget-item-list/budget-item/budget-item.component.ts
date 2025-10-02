import { Component, Input } from "@angular/core";
import { BudgetItem } from "../../../../model/interfaces/budgetItem";

@Component({
    selector: "app-budget-item",
    imports: [],
    templateUrl: "./budget-item.component.html",
    styleUrl: "./budget-item.component.scss",
})
export class BudgetItemComponent {
    @Input()
    budgetItem?: BudgetItem;
}
