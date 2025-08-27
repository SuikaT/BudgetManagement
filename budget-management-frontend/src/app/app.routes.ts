import { Routes } from "@angular/router";
import { ExpensesComponent } from "./views/budget/expenses.component";
import { BudgetComponent } from "./views/budget/budget.component";

export const routes: Routes = [
    { path: "budget", component: BudgetComponent, data: { title: "Budget", hideReturn: true } },
    { path: "expenses", component: ExpensesComponent, data: { title: "Expenses", returnTo: "/budget", hideReturn: false } },
    { path: "**", redirectTo: "expenses" },
];
