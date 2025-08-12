import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-menu-button",
    imports: [],
    templateUrl: "./menu-button.component.html",
    styleUrl: "./menu-button.component.scss",
    standalone: true,
})
export class MenuButtonComponent {
    @Input()
    label?: string;

    @Input()
    selected: boolean = false;

    @Output()
    onSelect = new EventEmitter();
}
