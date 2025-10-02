import { ExpenseCategory } from "../enums/expenseCategory";
import { ExpenseSchedule } from "../enums/expenseSchedule";

export interface BudgetItem {
    id?: number;
    label: string;
    targetAmount: number;
    category?: ExpenseCategory;
    scheduled?: ExpenseSchedule;
    spent?: number;
    monthlySpread: boolean;
    autoAddToExpenses: boolean;
}
