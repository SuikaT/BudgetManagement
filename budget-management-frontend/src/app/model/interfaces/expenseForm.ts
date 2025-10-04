import { FormControl } from "@angular/forms";

export interface ExpenseForm {
    label: FormControl<string | null>;
    amount: FormControl<number | null>;
    date: FormControl<Date | null>;
    category: FormControl<string | null>;
    paymentMethod: FormControl<string | null>;
    hide: FormControl<boolean | null>;
    relatedBudgetItemId: FormControl<number | null>;
}
