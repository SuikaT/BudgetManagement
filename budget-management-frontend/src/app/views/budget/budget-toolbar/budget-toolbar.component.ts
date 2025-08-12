import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MenuButtonComponent } from "../../../components/menu-button/menu-button.component";
import { IconButtonComponent } from "suik-ui";

@Component({
    selector: "app-budget-toolbar",
    imports: [MenuButtonComponent, IconButtonComponent],
    templateUrl: "./budget-toolbar.component.html",
    styleUrl: "./budget-toolbar.component.scss",
    standalone: true,
})
export class BudgetToolbarComponent implements OnInit {
    menuItems: string[] = [];

    selectedIndex = 0;

    currentRange?: { start: Date; end: Date };

    @Output()
    OnSelectionChange = new EventEmitter<{ start: Date; end: Date }>();

    ngOnInit(): void {
        this.menuItems = this.getMonthsBetween(new Date(2023, 0, 1), new Date());
    }

    getMonthsBetween(startDate: Date, endDate: Date): string[] {
        const result: string[] = [];

        let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

        while (current <= end) {
            // Format month as "YYYY-MM" or customize as you want
            const monthStr = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, "0")}`;
            result.push(monthStr);

            // Move to next month
            current.setMonth(current.getMonth() + 1);
        }

        return result.reverse();
    }

    onSelect(index: number) {
        this.selectedIndex = index;
    }
}
