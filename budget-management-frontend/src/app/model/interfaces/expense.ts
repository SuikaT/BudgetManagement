import { ExpenseCategory } from "../enums/expenseCategory";
import { PaymentMethod } from "../enums/PaymentMethod";

export interface Expense {
    id?: number;
    label: string;
    amount: number;
    date?: Date;
    category?: ExpenseCategory;
    paymentMethod?: PaymentMethod;
    selected?: boolean;
    hide?: boolean;
}
