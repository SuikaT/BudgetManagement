import { ExpenseCategory } from "../enums/expenseCategory";
import { ExpenseSchedule } from "../enums/expenseSchedule";

export interface Expense {
    id?: number;
    label: string;
    amount: number;
    date: Date;
    category?: ExpenseCategory;
    variable?: boolean;
    schedule?: ExpenseSchedule;
}
