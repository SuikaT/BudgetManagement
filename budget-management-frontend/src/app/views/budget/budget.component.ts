import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BudgetItemListComponent } from "./budget-item-list/budget-item-list.component";
import { StoreService } from "../../services/store.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: "app-budget",
    imports: [MatButtonModule, MatIconModule, BudgetItemListComponent, CommonModule],
    templateUrl: "./budget.component.html",
    styleUrl: "./budget.component.scss",
})
export class BudgetComponent {
    public _store = inject(StoreService);
    private router = inject(Router);

    openAddBudgetItem() {
        this.router.navigate(["/add-budget-item"]);
    }
}
