import { Component, Input } from "@angular/core";

@Component({
    selector: "app-expense-card",
    imports: [],
    templateUrl: "./expense-card.component.html",
    styleUrl: "./expense-card.component.scss",
    standalone: true,
})
export class ExpenseCardComponent {
    @Input()
    amount?: number;

    @Input()
    title?: string;
}
