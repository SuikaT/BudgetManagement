import { Component, inject } from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { ExpenseSchedule } from "../../../../model/enums/expenseSchedule";

@Component({
    selector: "app-group-by-dialog",
    imports: [MatDialogModule, MatRadioModule],
    templateUrl: "./group-by-dialog.component.html",
    styleUrl: "./group-by-dialog.component.scss",
})
export class GroupByDialogComponent {
    readonly dialogRef = inject(MatDialogRef<GroupByDialogComponent>);

    availableStrategy: { label: string; strategy: ExpenseSchedule }[] = [
        { label: "1 week", strategy: ExpenseSchedule.WEEKLY },
        { label: "2 weeks", strategy: ExpenseSchedule.SEMI_MONTHLY },
        { label: "1 month", strategy: ExpenseSchedule.MONTHLY },
        { label: "2 month", strategy: ExpenseSchedule.BIMESTRIAL },
        { label: "3 month", strategy: ExpenseSchedule.QUARTERLY },
        { label: "6 month", strategy: ExpenseSchedule.BIANNUAL },
        { label: "1 year", strategy: ExpenseSchedule.ANNUAL },
    ];
}
