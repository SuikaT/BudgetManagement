import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ExpenseCategory } from "../../model/enums/expenseCategory";
import { PaymentMethod } from "../../model/enums/PaymentMethod";
import { ExpenseForm } from "../../model/interfaces/expense-form";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-add-expense",
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule],
    templateUrl: "./add-expense.component.html",
    styleUrl: "./add-expense.component.scss",
})
export class AddExpenseComponent {
    expenseForm: FormGroup;

    paymentMethods = Object.values(PaymentMethod).filter((p) => typeof p === "string");

    categories = Object.values(ExpenseCategory).filter((p) => typeof p === "string");

    constructor(private fb: FormBuilder) {
        this.expenseForm = this.fb.group<ExpenseForm>({
            label: this.fb.control("", { validators: [Validators.required] }),
            amount: this.fb.control(0, { validators: [Validators.required] }),
            date: this.fb.control(new Date(), { validators: [Validators.required] }),
            category: this.fb.control(ExpenseCategory.GROCERY, { validators: [Validators.required] }),
            paymentMethod: this.fb.control(PaymentMethod.BANK_CARD, { validators: [Validators.required] }),
        });
    }

    public onSubmit(): void {}
}
