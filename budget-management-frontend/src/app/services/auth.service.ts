import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, first, map, Observable, of, tap } from "rxjs";
import { User } from "../model/interfaces/user";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../model/interfaces/loginResponse";
import { LocalPersistenceService } from "./local-persistence.service";
import { StorageKey } from "../model/enums/storageKey";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    currentUser$ = new BehaviorSubject<User | undefined>(undefined);

    private _token = ""; // Memory cache

    get token(): string {
        return this._token;
    }

    constructor(
        private http: HttpClient,
        private _localPersistence: LocalPersistenceService,
        private router: Router,
    ) {}

    get currentUser(): User | undefined {
        return this.currentUser$.getValue();
    }

    login(email: string, password: string): Observable<boolean> {
        return this.authenticate(email, password).pipe(
            tap((response) => {
                console.log("authentication success:", response);
                // save token in memory
                this._token = response.token;
                // set currentUser
                this.currentUser$.next(response.user);
                // save token in secured storage
                this._localPersistence.setSecure(StorageKey.TOKEN, this._token);

                console.log(this._token);
            }),
            map(() => true),
            catchError((error) => {
                console.error("Authentication error:", error);
                return of(false);
            }),
        );
    }

    authenticate(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/authenticate`, { email, password }).pipe(first());
    }

    logout() {
        try {
            this._localPersistence.removeSecure(StorageKey.TOKEN);
        } catch (error) {}

        this.router.navigate(["login"]);
    }
}
