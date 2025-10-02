import { Component, Input } from "@angular/core";
import { BudgetItem } from "../../../model/interfaces/budgetItem";
import { BudgetItemComponent } from "./budget-item/budget-item.component";

@Component({
    selector: "app-budget-item-list",
    imports: [BudgetItemComponent],
    templateUrl: "./budget-item-list.component.html",
    styleUrl: "./budget-item-list.component.scss",
})
export class BudgetItemListComponent {
    @Input()
    budgetItems: BudgetItem[] = [];
}
