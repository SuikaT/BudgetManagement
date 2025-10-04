import { Component, Input } from "@angular/core";
import { BudgetItem } from "../../../../model/interfaces/budgetItem";
import { BudgetProgressComponent } from "../../../../components/budget-progress/budget-progress.component";

@Component({
    selector: "app-budget-item",
    imports: [BudgetProgressComponent],
    templateUrl: "./budget-item.component.html",
    styleUrl: "./budget-item.component.scss",
})
export class BudgetItemComponent {
    
    @Input()
    budgetItem!: BudgetItem;
}
