import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./views/footer/footer.component";
import { ThemeService } from "./services/theme.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, FooterComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    standalone: true,
})
export class AppComponent implements OnInit {
    title = "budget-management-frontend";

    constructor(private _theme: ThemeService) {}

    ngOnInit(): void {
        this._theme.initTheme();
    }
}
