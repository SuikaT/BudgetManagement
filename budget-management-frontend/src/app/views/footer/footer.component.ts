import { Component, Input, OnInit, signal } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { StatesService } from "../../services/states.service";
import { ActivatedRouteSnapshot, Router, RoutesRecognized } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { getDeepestChild } from "suikility";

@Component({
    selector: "app-footer",
    imports: [MatIcon, MatIconButton],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
    standalone: true,
})
export class FooterComponent implements OnInit {
    constructor(private router: Router) {}

    @Input()
    hideAddButton: boolean = false;

    sub: Subscription | undefined;

    ngOnInit(): void {
        this.sub = this.router.events.pipe(filter((e) => e instanceof RoutesRecognized)).subscribe((event) => {
            const snapshot = getDeepestChild((event as RoutesRecognized).state.root);
            const data = snapshot.data ?? {};

            this.hideAddButton = data["hideAddButton"] ?? false;
        });
    }

    onAddClick() {
        this.router.navigateByUrl("/add-expense");
    }
}
