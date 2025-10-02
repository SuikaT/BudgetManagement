import { Component, OnInit } from "@angular/core";
import { ExpenseCardComponent } from "./expense-card/expense-card.component";
import { ExpensesToolbarComponent } from "./expense-toolbar/expenses-toolbar.component";
import { StoreService } from "../../services/store.service";
import { CommonModule } from "@angular/common";
import { ExpenseFooterComponent } from "./expense-footer/expense-footer.component";
import { ExpensesService } from "./expenses.service";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: "app-expenses",
    imports: [CommonModule, ExpensesToolbarComponent, ExpenseFooterComponent, RouterModule],
    templateUrl: "./expenses.component.html",
    styleUrl: "./expenses.component.scss",
    standalone: true,
})
export class ExpensesComponent {
    constructor(
        public _store: StoreService,
        public _expense: ExpensesService,
    ) {}
}
