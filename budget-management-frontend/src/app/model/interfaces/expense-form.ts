import { FormControl } from "@angular/forms";
import { ExpenseCategory } from "../enums/expenseCategory";
import { PaymentMethod } from "../enums/PaymentMethod";

export interface ExpenseForm {
    label: FormControl<string | null>;
    amount: FormControl<number | null>;
    date: FormControl<Date | null>;
    category: FormControl<ExpenseCategory | null>;
    paymentMethod: FormControl<PaymentMethod | null>;
}
