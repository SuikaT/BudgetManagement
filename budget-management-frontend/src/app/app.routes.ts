import { Routes } from "@angular/router";
import { BudgetComponent } from "./views/budget/budget.component";

export const routes: Routes = [
    { path: "", component: BudgetComponent },
    { path: "budget", component: BudgetComponent },
    { path: "**", redirectTo: "" },
];
