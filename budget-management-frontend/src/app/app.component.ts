import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { FooterComponent } from './views/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './views/header/header.component';
import { filter, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AcquisitionService } from './services/acquisition.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
    // inject AcquisitionService globaly
    private readonly _ = inject(AcquisitionService);

    sub: Subscription | undefined;

    hideReturn = true;
    returnTo = '/';
    title = '';

    constructor(
        private _theme: ThemeService,
        private router: Router,
        private _user: AuthService,
    ) {}

    ngOnInit(): void {
        this._theme.initTheme();

        this.sub = this.router.events.pipe(filter((e) => e instanceof RoutesRecognized)).subscribe((event) => {
            const snapshot = this.getDeepestChild((event as RoutesRecognized).state.root);
            const data = snapshot.data ?? {};

            this.hideReturn = data['hideReturn'] ?? true;
            this.returnTo = data['returnTo'] ?? '/';
            this.title = data['title'] ?? '';
        });

        // TODO Add connexion system
        this._user.currentUser$.next({ id: 1, lastname: 'Bourney', firstname: 'Julien', email: 'bourney.julien@gmaim.com', token: 'ITS_A_TOKEN' });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    getDeepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        let current = route;
        while (current.firstChild) {
            current = current.firstChild;
        }
        return current;
    }
}
