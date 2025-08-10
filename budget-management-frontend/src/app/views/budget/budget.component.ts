import { Component } from "@angular/core";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseCardComponent } from "./expense-card/expense-card.component";
import { BudgetToolbarComponent } from "./budget-toolbar/budget-toolbar.component";

@Component({
    selector: "app-budget",
    imports: [ExpenseListComponent, ExpenseCardComponent, BudgetToolbarComponent],
    templateUrl: "./budget.component.html",
    styleUrl: "./budget.component.scss",
})
export class BudgetComponent {}
