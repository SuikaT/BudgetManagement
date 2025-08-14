import { Component, signal } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { StatesService } from "../../services/states.service";

@Component({
    selector: "app-footer",
    imports: [MatIcon, MatIconButton],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
    standalone: true,
})
export class FooterComponent {
    constructor(private _states: StatesService) {}

    onAddClick() {
        this._states.addEvent$.next();
    }
}
