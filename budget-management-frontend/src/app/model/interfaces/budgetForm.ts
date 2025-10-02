import { FormControl } from "@angular/forms";

export interface BudgetForm {
    label: FormControl<string | null>;
    targetAmount: FormControl<number | null>;
    category: FormControl<string | null>;
    isScheduled: FormControl<boolean | null>;
    scheduled: FormControl<string | null>;
    autoAdd: FormControl<boolean | null>;
    date: FormControl<Date | null>;
}
