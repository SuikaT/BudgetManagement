import { Component, Input, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";
import { StatesService } from "../../services/states.service";

@Component({
    selector: "app-header",
    imports: [MatIcon],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    @Input()
    title?: string;

    @Input()
    hideReturn: boolean = true;

    @Input()
    returnTo: string = "/";

    constructor(
        private router: Router,
        private _states: StatesService,
    ) {}

    ngOnInit(): void {
        this._states.triggerReturn$.subscribe(() => this.return());
    }

    return() {
        this.router.navigateByUrl(this.returnTo);
    }
}
