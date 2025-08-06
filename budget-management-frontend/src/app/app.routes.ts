import { Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { BudgetComponent } from './views/budget/budget.component';

export const routes: Routes = [
   { path: '', component: MainPageComponent },
   { path: 'budget', component: BudgetComponent},
   { path: '**', redirectTo: '' }
];
