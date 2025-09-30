import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ExpenseForm } from "../../model/interfaces/expense-form";
import { PaymentMethod } from "../../model/enums/PaymentMethod";
import { ExpenseCategory } from "../../model/enums/expenseCategory";
import { Expense } from "../../model/interfaces/expense";

@Component({
    selector: "app-expense-form",
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule],
    templateUrl: "./expense-form.component.html",
    styleUrl: "./expense-form.component.scss",
})
export class ExpenseFormComponent {
    expenseForm: FormGroup;

    paymentMethodEnum = PaymentMethod;
    paymentMethods: string[] = Object.values(PaymentMethod);

    expenseCategoryEnum = ExpenseCategory;
    categories: string[] = Object.values(ExpenseCategory);

    @Output()
    onSubmit = new EventEmitter<Expense>();

    constructor(private fb: FormBuilder) {
        this.expenseForm = this.fb.group<ExpenseForm>({
            label: this.fb.control("Expense", { validators: [Validators.required] }),
            amount: this.fb.control(0, { validators: [Validators.required] }),
            date: this.fb.control(new Date(), { validators: [Validators.required] }),
            category: this.fb.control(ExpenseCategory.GROCERY, { validators: [Validators.required] }),
            paymentMethod: this.fb.control(PaymentMethod.BANK_CARD, { validators: [Validators.required] }),
        });
    }

    submitClick() {
        // map form values into an Expense object
        const expense = this.expenseFormToExpense();
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
        };
    }
}
