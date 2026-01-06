import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CredentialsForm } from "../../model/form/credentialsForm";
import { AuthService } from "../../services/auth.service";
import { LocalPersistenceService } from "../../services/local-persistence.service";
import { StorageKey } from "../../model/enums/storageKey";
import { Router } from "@angular/router";
import { NotificationService } from "../../services/notification.service";

@Component({
    selector: "app-login",
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckbox],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _auth: AuthService,
        private _localPersistence: LocalPersistenceService,
        private router: Router,
        private _notification: NotificationService,
    ) {}

    ngOnInit() {
        // init form
        this.loginForm = this.fb.group<CredentialsForm>({
            email: this.fb.control("", { validators: [Validators.required] }),
            password: this.fb.control("", { validators: [Validators.required] }),
            rememberEmail: this.fb.control(false, { validators: [Validators.required] }),
        });

        // try to retrieve email
        this._localPersistence
            .getSecure(StorageKey.EMAIL)
            .then((result) => this.loginForm.patchValue({ email: result.value, rememberEmail: true }))
            .catch((error) => {
                console.log(error);
            });
    }

    submitClick() {
        const formValue = this.loginForm.getRawValue();

        this._auth.login(formValue.email, formValue.password).subscribe((success) => {
            if (!success) {
                this._notification.showError("Invalid credentials");
                return;
            }

            if (formValue.rememberEmail) {
                // save email
                this._localPersistence.setSecure(StorageKey.EMAIL, formValue.email);
            } else {
                this._localPersistence.removeSecure(StorageKey.EMAIL);
            }

            this.router.navigate(["expenses"]);
        });
    }
}
