import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { MenuButtonComponent } from "../../../components/menu-button/menu-button.component";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { DateRange } from "../../../model/interfaces/DateRange";
import { ExpenseSchedule } from "../../../model/enums/expenseSchedule";
import { ExpensesService } from "../expenses.service";
import { StoreService } from "../../../services/store.service";

@Component({
    selector: "app-expenses-toolbar",
    imports: [MenuButtonComponent, MatIcon, MatIconButton],
    templateUrl: "./expenses-toolbar.component.html",
    styleUrl: "./expenses-toolbar.component.scss",
    standalone: true,
})
export class ExpensesToolbarComponent implements OnInit {
    private _expense = inject(ExpensesService);
    private _store = inject(StoreService);

    menuItems: { label: string; dateRange: DateRange }[] = [];

    selectedIndex = 0;

    OnSelectionChange = new EventEmitter<DateRange>();

    ngOnInit(): void {
        this._store.expensesDateRange$.subscribe((dateRange) => {
            if (dateRange) {
                this.refreshMenuItems(dateRange);
            }
        });
    }

    refreshMenuItems(dateRange: DateRange) {
        console.log(dateRange);

        switch (this._expense.groupingStrategy) {
            case ExpenseSchedule.WEEKLY:
                this.menuItems = [];
                break;
            case ExpenseSchedule.SEMI_MONTHLY:
                this.menuItems = [];
                break;
            case ExpenseSchedule.MONTHLY:
                this.menuItems = this.getMonths(dateRange);
                break;
            case ExpenseSchedule.BIMESTRIAL:
                this.menuItems = this.getMonths(dateRange, 2);
                break;
            case ExpenseSchedule.QUARTERLY:
                this.menuItems = this.getMonths(dateRange, 4);
                break;
            case ExpenseSchedule.BIANNUAL:
                this.menuItems = this.getMonths(dateRange, 6);
                break;
            case ExpenseSchedule.ANNUAL:
                this.menuItems = this.getYears(dateRange);
                break;
            default:
                this.menuItems = [];
                break;
        }
    }

    getMonths(dateRange: DateRange, monthInterval: number = 1): { label: string; dateRange: DateRange }[] {
        const result: { label: string; dateRange: DateRange }[] = [];

        let current = this._expense.getLastDayOfMonth(dateRange.end);
        const currentYear = current.getFullYear();
        // iterate from end until reaching the start date
        while (current >= dateRange.start) {
            const itemDateRange = {
                start: new Date(current.getFullYear(), current.getMonth() - monthInterval + 1, 1),
                end: this._expense.getLastDayOfMonth(current),
            };

            const label = monthInterval > 1 ? this.getMonthIntervalLabel(itemDateRange, currentYear) : this.getMonthLabel(itemDateRange.end, currentYear);

            result.push({
                label: label,
                dateRange: itemDateRange,
            });

            // substract with the given gap
            current = new Date(current.getFullYear(), current.getMonth() - monthInterval + 1, 0);
        }

        return result;
    }
    getMonthIntervalLabel(itemDateRange: DateRange, currentYear: number): string {
        return this.getMonthLabel(itemDateRange.start, currentYear) + " - " + this.getMonthLabel(itemDateRange.end, currentYear);
    }

    getMonthLabel(date: Date, currentYear: number): string {
        if (date.getFullYear() == currentYear) {
            return date.toLocaleString("default", { month: "short" });
        } else {
            return date.toLocaleString("default", { month: "short", year: "numeric" });
        }
    }

    getYears(dateRange: DateRange): { label: string; dateRange: DateRange }[] {
        const result: { label: string; dateRange: DateRange }[] = [];

        let current = dateRange.end;
        // iterate from end until reaching the start date
        while (current >= dateRange.start) {
            const itemDateRange = {
                start: new Date(current.getFullYear(), 0, 1),
                end: new Date(current.getFullYear(), 12, 0),
            };

            const label = itemDateRange.start.toLocaleString("default", { year: "numeric" });
            result.push({
                label: label,
                dateRange: itemDateRange,
            });

            // substract with the given gap
            current = new Date(current.getFullYear() - 1, 12, 0);
        }

        return result;
    }

    monthsBetween(start: Date, end: Date): number {
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + 1; // + 1 to include end month

        return years * 12 + months;
    }

    onSelect(dateRange: DateRange, index: number) {
        this.selectedIndex = index;

        this._expense.filterDateRange$.next(dateRange);
    }

    onDateParameterClick(): void {
        //TODO regroup my month / 3 month / 6 month / 1 year
    }
}
