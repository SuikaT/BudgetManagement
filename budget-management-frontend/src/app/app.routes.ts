import { Routes } from '@angular/router';
import { ExpensesComponent } from './views/expenses/expenses.component';
import { BudgetComponent } from './views/budget/budget.component';
import { ExpensesCategoriesComponent } from './views/expenses/expenses-categories/expenses-categories.component';
import { ExpensesCategoryDetailsComponent } from './views/expenses/expenses-category-details/expenses-category-details.component';
import { AddExpenseComponent } from './views/expenses/add-expense/add-expense.component';
import { EditExpenseComponent } from './views/expenses/edit-expense/edit-expense.component';
import { AddBudgetItemComponent } from './views/budget/add-budget-item/add-budget-item.component';
import { EditBudgetItemComponent } from './views/budget/edit-budget-item/edit-budget-item.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: '', hideReturn: true } },
    { path: 'budget', component: BudgetComponent, data: { title: 'Budget', hideReturn: true } },
    {
        path: 'expenses',
        component: ExpensesComponent,
        children: [
            {
                path: '',
                component: ExpensesCategoriesComponent,
                data: { title: 'Expenses', returnTo: '/budget', hideReturn: false },
            },
            {
                path: ':category',
                component: ExpensesCategoryDetailsComponent,
                data: { title: 'Expenses', returnTo: '/expenses', hideReturn: false },
            },
        ],
    },
    { path: 'add-expense', component: AddExpenseComponent, data: { title: 'Add Expense', returnTo: '/expenses', hideReturn: false } },
    { path: 'edit-expense', component: EditExpenseComponent, data: { title: 'Edit Expense', returnTo: '/expenses', hideReturn: false } },
    { path: 'add-budget-item', component: AddBudgetItemComponent, data: { title: 'Add Budget Item', returnTo: '/budget', hideReturn: false } },
    { path: 'edit-budget-item/:id', component: EditBudgetItemComponent, data: { title: 'Edit Budget Item', returnTo: '/budget', hideReturn: false } },
    { path: '**', redirectTo: 'login' },
];
