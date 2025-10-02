import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { Expense } from "../../../model/interfaces/expense";
import { PersistenceService } from "../../../services/persistence.service";
import { StoreService } from "../../../services/store.service";
import { NotificationService } from "../../../services/notification.service";
import { ExpensesService } from "../expenses.service";
import { LongPressDirective } from "../../../directives/long-press.directive";

@Component({
    selector: "app-expense-list",
    imports: [ExpenseItemComponent, LongPressDirective],
    templateUrl: "./expense-list.component.html",
    styleUrl: "./expense-list.component.scss",
    standalone: true,
})
export class ExpenseListComponent {
    @Input()
    expenses: Expense[] = [];

    @Input()
    selectionAvailable = false;

    @Output()
    onItemClick = new EventEmitter<Expense>();

    @Output()
    onLongPress = new EventEmitter<Expense>();

    constructor(
        private _persistence: PersistenceService,
        private _notification: NotificationService,
        private _expense: ExpensesService,
    ) {}
}
