import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router, RouterOutlet, RoutesRecognized } from "@angular/router";
import { FooterComponent } from "./views/footer/footer.component";
import { ThemeService } from "./services/theme.service";
import { HeaderComponent } from "./views/header/header.component";
import { filter, Subscription } from "rxjs";
import { AuthService } from "./services/auth.service";
import { AcquisitionService } from "./services/acquisition.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    standalone: true,
})
export class AppComponent implements OnInit {
    // inject AcquisitionService globaly
    private readonly _ = inject(AcquisitionService);

    constructor(
        private _theme: ThemeService,
        private router: Router,
        private _auth: AuthService,
    ) {}

    ngOnInit(): void {
        this._theme.initTheme();

        this._auth.login("bourney.julien@gmail.com", "test1234");
    }
}
