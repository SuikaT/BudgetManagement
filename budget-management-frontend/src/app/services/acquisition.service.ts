import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { filter } from "rxjs/internal/operators/filter";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { PersistenceService } from "./persistence.service";
import { StoreService } from "./store.service";

@Injectable({
    providedIn: "root",
})
export class AcquisitionService {
    constructor(
        private _auth: AuthService,
        private _persistence: PersistenceService,
        private _store: StoreService,
    ) {
        this.initializeDataAcquisition();
    }

    private initializeDataAcquisition() {
        this._auth.currentUser$
            .pipe(
                filter((user) => user !== undefined && user !== null), // Only proceed when user exists
                switchMap((user) => {
                    return this._persistence.getExpenses(user.id);
                }),
            )
            .subscribe({
                next: (expenses) => {
                    this._store.expenses$.next(expenses);
                },
                error: (error) => {
                    console.error("Error loading data:", error);
                },
            });
    }
}
