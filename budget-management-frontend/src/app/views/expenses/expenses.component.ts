import { Component, effect, OnInit } from "@angular/core";
import { ExpenseCardComponent } from "./expense-card/expense-card.component";
import { ExpensesToolbarComponent } from "./expense-toolbar/expenses-toolbar.component";
import { StoreService } from "../../services/store.service";
import { Expense } from "../../model/interfaces/expense";
import { CommonModule } from "@angular/common";
import { StatesService } from "../../services/states.service";
import { ExpenseListComponent } from "../expenses/expense-list/expense-list.component";
import { ExpenseFooterComponent } from "./expense-footer/expense-footer.component";
import { ExpensesService } from "./expenses.service";

@Component({
    selector: "app-expenses",
    imports: [CommonModule, ExpenseListComponent, ExpenseCardComponent, ExpensesToolbarComponent, ExpenseFooterComponent],
    templateUrl: "./expenses.component.html",
    styleUrl: "./expenses.component.scss",
    standalone: true,
})
export class ExpensesComponent implements OnInit {
    constructor(
        public _store: StoreService,
        public _expense: ExpensesService,
    ) {}

    ngOnInit(): void {
        this._store.expenses$.subscribe(() => {
            this._expense.refreshAmount();
        });
    }
}
