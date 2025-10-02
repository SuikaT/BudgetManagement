import { Routes } from "@angular/router";
import { ExpensesComponent } from "./views/expenses/expenses.component";
import { BudgetComponent } from "./views/budget/budget.component";
import { AddExpenseComponent } from "./views/add-expense/add-expense.component";
import { EditExpenseComponent } from "./views/edit-expense/edit-expense.component";
import { ExpensesCategoriesComponent } from "./views/expenses/expenses-categories/expenses-categories.component";
import { ExpensesCategoryDetailsComponent } from "./views/expenses/expenses-category-details/expenses-category-details.component";

export const routes: Routes = [
    { path: "budget", component: BudgetComponent, data: { title: "Budget", hideReturn: true } },
    {
        path: "expenses",
        component: ExpensesComponent,
        children: [
            {
                path: "",
                component: ExpensesCategoriesComponent,
                data: { title: "Expenses", returnTo: "/budget", hideReturn: false },
            },
            {
                path: ":category",
                component: ExpensesCategoryDetailsComponent,
                data: { title: "Expenses", returnTo: "/expenses", hideReturn: false },
            },
        ],
    },
    { path: "add-expense", component: AddExpenseComponent, data: { title: "Add Expense", returnTo: "/expenses", hideReturn: false } },
    { path: "edit-expense", component: EditExpenseComponent, data: { title: "Edit Expense", returnTo: "/expenses", hideReturn: false } },
    { path: "**", redirectTo: "expenses" },
];
