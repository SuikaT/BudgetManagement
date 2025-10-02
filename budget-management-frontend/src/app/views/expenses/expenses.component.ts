import { Component, OnInit } from "@angular/core";
import { ExpenseCardComponent } from "./expense-card/expense-card.component";
import { ExpensesToolbarComponent } from "./expense-toolbar/expenses-toolbar.component";
import { StoreService } from "../../services/store.service";
import { CommonModule } from "@angular/common";
import { ExpenseListComponent } from "../expenses/expense-list/expense-list.component";
import { ExpenseFooterComponent } from "./expense-footer/expense-footer.component";
import { ExpensesService } from "./expenses.service";
import { PersistenceService } from "../../services/persistence.service";
import { AuthService } from "../../services/auth.service";

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
        private _persistence: PersistenceService,
        private _auth: AuthService,
    ) {}

    ngOnInit(): void {
        // refresh amount on expenses update
        this._store.expenses$.subscribe(() => {
            this._expense.refreshAmount();
        });

        // retrieve expenses on date range selection change
        this._expense.filterDateRange$.subscribe((dateRange) => {
            const user = this._auth.currentUser;
            if (user) {
                this._persistence.getExpenses(user.id, dateRange).subscribe({
                    next: (expenses) => {
                        this._store.expenses$.next(expenses);
                    },
                    error: (error) => {
                        console.error("Error loading data:", error);
                    },
                });
            }
        });
    }
}
