import { FormControl } from "@angular/forms";

export interface BudgetForm {
    category: FormControl<string | null>;
    label: FormControl<string | null>;
    targetAmount: FormControl<number | null>;
    isScheduled: FormControl<boolean | null>;
    schedule: FormControl<string | null>;
    autoAddToExpenses: FormControl<boolean | null>;
    paymentMethod: FormControl<string | null>;
    date: FormControl<Date | null>;
}
