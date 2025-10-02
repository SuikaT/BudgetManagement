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

@Component({
    selector: "app-budget-form",
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatCheckbox],
    templateUrl: "./budget-form.component.html",
    styleUrl: "./budget-form.component.scss",
})
export class BudgetFormComponent implements OnInit {
    expenseForm!: FormGroup;

    paymentMethodEnum = PaymentMethod;
    paymentMethods: string[] = Object.values(PaymentMethod);

    expenseCategoryEnum = ExpenseCategory;
    categories: string[] = Object.values(ExpenseCategory);

    @Input()
    submitLabel: string = "";

    @Input()
    expense: Expense | undefined;

    @Output()
    onSubmit = new EventEmitter<Expense>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.expenseForm = this.fb.group<ExpenseForm>({
            label: this.fb.control(this.expense?.label ?? "Expense", { validators: [Validators.required] }),
            amount: this.fb.control(this.expense?.amount ?? 0, { validators: [Validators.required] }),
            date: this.fb.control(this.expense?.date ?? new Date(), { validators: [Validators.required] }),
            category: this.fb.control(this.expense?.category ?? ExpenseCategory.GROCERY, { validators: [Validators.required] }),
            paymentMethod: this.fb.control(this.expense?.paymentMethod ?? PaymentMethod.BANK_CARD, { validators: [Validators.required] }),
            hide: this.fb.control(this.expense?.hide ?? false),
        });
    }

    submitClick() {
        // map form values into an Expense object
        const expense = this.expense ? this.updateExpense() : this.expenseFormToExpense();

        // submit form
        this.onSubmit.emit(expense);
    }

    expenseFormToExpense(): Expense {
        const formValue = this.expenseForm.getRawValue();

        return {
            label: formValue.label,
            amount: Math.abs(formValue.amount),
            date: formValue.date,
            paymentMethod: formValue.paymentMethod as PaymentMethod,
            category: formValue.category as ExpenseCategory,
            selected: false,
            hide: formValue.hide,
        };
    }

    updateExpense(): Expense {
        const formValue = this.expenseForm.getRawValue();

        return {
            ...this.expense!,
            label: formValue.label,
            amount: Math.abs(formValue.amount),
            date: formValue.date,
            paymentMethod: formValue.paymentMethod as PaymentMethod,
            category: formValue.category as ExpenseCategory,
            hide: formValue.hide,
        };
    }
}
