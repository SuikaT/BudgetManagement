import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet, RoutesRecognized } from "@angular/router";
import { FooterComponent } from "./views/footer/footer.component";
import { ThemeService } from "./services/theme.service";
import { HeaderComponent } from "./views/header/header.component";
import { filter, Subscription } from "rxjs";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
    sub: Subscription | undefined;

    hideReturn = true;
    returnTo = "/";
    title = "";

    constructor(
        private _theme: ThemeService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this._theme.initTheme();

        this.sub = this.router.events.pipe(filter((e) => e instanceof RoutesRecognized)).subscribe((event) => {
            const data = event.state.root.firstChild?.data ?? {};
            this.hideReturn = data["hideReturn"] ?? true;
            this.returnTo = data["returnTo"] ?? "/";
            this.title = data["title"] ?? "";
        });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
