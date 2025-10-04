import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ExpenseForm } from "../../model/interfaces/expenseForm";
import { PaymentMethod } from "../../model/enums/PaymentMethod";
import { ExpenseCategory } from "../../model/enums/expenseCategory";
import { Expense } from "../../model/interfaces/expense";
import { MatCheckbox } from "@angular/material/checkbox";
import { BudgetItem } from "../../model/interfaces/budgetItem";
import { BudgetForm } from "../../model/interfaces/budgetForm";
import { scheduled } from "rxjs";
import { ExpenseSchedule } from "../../model/enums/expenseSchedule";

@Component({
    selector: "app-budget-form",
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatCheckbox],
    templateUrl: "./budget-form.component.html",
    styleUrl: "./budget-form.component.scss",
})
export class BudgetFormComponent implements OnInit {
    budgetForm!: FormGroup;

    paymentMethodEnum = PaymentMethod;
    paymentMethods: string[] = Object.values(PaymentMethod).filter((s) => s != PaymentMethod.UNDEFINED);

    expenseCategoryEnum = ExpenseCategory;
    categories: string[] = Object.values(ExpenseCategory);

    expenseScheduleEnum = ExpenseSchedule;
    expenseSchedules: string[] = Object.values(ExpenseSchedule).filter((s) => s != ExpenseSchedule.UNDEFINED);

    @Input()
    submitLabel: string = "";

    @Input()
    budgetItem: BudgetItem | undefined;

    @Output()
    onSubmit = new EventEmitter<BudgetItem>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.budgetForm = this.fb.group<BudgetForm>({
            label: this.fb.control(this.budgetItem?.label ?? "Expense", { validators: [Validators.required] }),
            targetAmount: this.fb.control(this.budgetItem?.targetAmount ?? 0, { validators: [Validators.required] }),
            category: this.fb.control(this.budgetItem?.category ?? ExpenseCategory.GROCERY, { validators: [Validators.required] }),
            isScheduled: this.fb.control(this.budgetItem?.schedule != ExpenseSchedule.UNDEFINED),
            schedule: this.fb.control(this.budgetItem?.schedule ?? ExpenseSchedule.MONTHLY),
            autoAddToExpenses: this.fb.control(this.budgetItem?.autoAddToExpenses ?? false),
            paymentMethod: this.fb.control(this.budgetItem?.paymentMethod ?? PaymentMethod.BANK_CARD, { validators: [Validators.required] }),
            date: this.fb.control(this.budgetItem?.date ?? new Date(), { validators: [Validators.required] }),
        });
    }

    submitClick() {
        // map form values into an Expense object
        const budgetItem = this.budgetItem ? this.mapFormToBudgetItem(this.budgetItem) : this.mapFormToBudgetItem();

        // submit form
        this.onSubmit.emit(budgetItem);
    }

    mapFormToBudgetItem(base?: BudgetItem): BudgetItem {
        const formValue = this.budgetForm.getRawValue();
        const autoAddToExpenses = formValue.isScheduled ? formValue.autoAddToExpenses : false;

        return {
            ...(base ?? {}), // merge only if base provided
            label: formValue.label,
            targetAmount: Math.abs(formValue.targetAmount),
            category: formValue.category as ExpenseCategory,
            schedule: formValue.isScheduled ? formValue.scheduled : ExpenseSchedule.UNDEFINED,
            autoAddToExpenses: autoAddToExpenses,
            paymentMethod: autoAddToExpenses ? (formValue.paymentMethod as PaymentMethod) : PaymentMethod.UNDEFINED,
            date: autoAddToExpenses ? formValue.date : undefined,
        };
    }
}
