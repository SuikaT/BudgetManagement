import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../model/interfaces/user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    currentUser$ = new BehaviorSubject<User | undefined>(undefined);
}
