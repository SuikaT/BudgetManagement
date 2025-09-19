import { Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: "root",
})
export class StatesService {
    public triggerReturn$: Subject<void> = new Subject();
}
