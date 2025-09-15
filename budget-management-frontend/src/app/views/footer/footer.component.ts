import { Component, signal } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { StatesService } from "../../services/states.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-footer",
    imports: [MatIcon, MatIconButton],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
    standalone: true,
})
export class FooterComponent {
    constructor(
        private _states: StatesService,
        private router: Router,
    ) {}

    onAddClick() {
        this.router.navigateByUrl("/add-expense");
    }
}
