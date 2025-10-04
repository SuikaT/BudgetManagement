import { ExpenseCategory } from "../enums/expenseCategory";
import { ExpenseSchedule } from "../enums/expenseSchedule";
import { PaymentMethod } from "../enums/PaymentMethod";

export interface BudgetItem {
    id?: number;
    category?: ExpenseCategory;
    label: string;
    targetAmount: number;
    schedule?: ExpenseSchedule;
    autoAddToExpenses: boolean;
    paymentMethod: PaymentMethod;
    date: Date;
    spent?: number;
}
