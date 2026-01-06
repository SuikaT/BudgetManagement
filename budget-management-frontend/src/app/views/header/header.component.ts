import { Component, Input, OnInit } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RoutesRecognized } from "@angular/router";
import { StatesService } from "../../services/states.service";
import { AuthService } from "../../services/auth.service";
import { filter, Subscription } from "rxjs";

@Component({
    selector: "app-header",
    imports: [MatIcon],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
    @Input()
    title: string = "";

    @Input()
    hideReturn: boolean = true;

    @Input()
    returnTo: string = "/";

    @Input()
    hideLogout: boolean = false;

    sub: Subscription | undefined;

    constructor(
        private router: Router,
        private _states: StatesService,
        private _auth: AuthService,
    ) {}

    ngOnInit(): void {
        this.sub = this.router.events.pipe(filter((e) => e instanceof RoutesRecognized)).subscribe((event) => {
            const snapshot = this.getDeepestChild((event as RoutesRecognized).state.root);
            const data = snapshot.data ?? {};

            this.hideReturn = data["hideReturn"] ?? true;
            this.returnTo = data["returnTo"] ?? "/";
            this.title = data["title"] ?? "";
            this.hideLogout = data["hideLogout"] ?? false;
        });

        this._states.triggerReturn$.subscribe(() => this.return());
    }

    return() {
        this.router.navigateByUrl(this.returnTo);
    }

    logout() {
        this._auth.logout();
    }

    getDeepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        let current = route;
        while (current.firstChild) {
            current = current.firstChild;
        }
        return current;
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
