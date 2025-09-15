import { Routes } from "@angular/router";
import { ExpensesComponent } from "./views/expenses/expenses.component";
import { BudgetComponent } from "./views/budget/budget.component";
import { AddExpenseComponent } from "./views/add-expense/add-expense.component";

export const routes: Routes = [
    { path: "budget", component: BudgetComponent, data: { title: "Budget", hideReturn: true } },
    { path: "expenses", component: ExpensesComponent, data: { title: "Expenses", returnTo: "/budget", hideReturn: false } },
    { path: "add-expense", component: AddExpenseComponent, data: { title: "Add Expense", returnTo: "/expenses", hideReturn: false } },
    { path: "**", redirectTo: "expenses" },
];
