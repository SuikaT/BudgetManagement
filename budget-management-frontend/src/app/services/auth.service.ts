import { Injectable } from "@angular/core";
import { BehaviorSubject, first, Observable } from "rxjs";
import { User } from "../model/interfaces/user";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../model/interfaces/loginResponse";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    currentUser$ = new BehaviorSubject<User | undefined>(undefined);

    private _token = ""; // Memory cache

    get token(): string {
        return this._token;
    }

    constructor(private http: HttpClient) {}

    get currentUser(): User | undefined {
        return this.currentUser$.getValue();
    }

    login(email: string, password: string) {
        this.authenticate(email, password).subscribe({
            next: (response) => {
                console.log("authentication success: ", response);

                this._token = response.token;
                this.currentUser$.next(response.user);

                //TODO store token into  cookies
            },
            error: (error) => {
                console.error("Authentication error:", error);
            },
        });
    }

    authenticate(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/authenticate`, { email, password }).pipe(first());
    }
}
