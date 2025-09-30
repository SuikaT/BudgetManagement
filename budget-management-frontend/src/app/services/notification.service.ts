import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarModule, MatSnackBarRef } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    private snackBar = inject(MatSnackBar);

    showSuccess(message: string, duration = 3000) {
        this.snackBar.open(message, "OK", {
            duration,
            panelClass: ["snackbar-success"],
        });
    }

    showError(message: string, duration = 3000) {
        this.snackBar.open(message, "OK", {
            duration,
            panelClass: ["snackbar-error"],
        });
    }
}
