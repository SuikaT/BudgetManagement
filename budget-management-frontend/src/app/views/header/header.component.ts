import { Component, Input, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-header",
    imports: [MatIcon],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    @Input()
    title?: string;

    @Input()
    hideReturn: boolean = true;

    @Input()
    returnTo: string = "/";

    constructor(private router: Router) {}

    return() {
        this.router.navigateByUrl(this.returnTo);
    }
}
