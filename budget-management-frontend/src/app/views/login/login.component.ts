import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CredentialsForm } from '../../model/form/credentialsForm';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { AuthService } from '../../services/auth.service';
import { LocalPersistenceService } from '../../services/local-persistence.service';
import { StorageKey } from '../../model/enums/storageKey';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckbox],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _auth: AuthService,
        private _localPersistence: LocalPersistenceService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        const credientials = { email: '', password: '' };

        this.loginForm = this.fb.group<CredentialsForm>({
            email: this.fb.control(credientials.email, { validators: [Validators.required] }),
            password: this.fb.control(credientials.password, { validators: [Validators.required] }),
            rememberEmail: this.fb.control(false, { validators: [Validators.required] }),
        });
    }

    submitClick() {
        const formValue = this.loginForm.getRawValue();

        this._auth.login(formValue.email, formValue.password).subscribe((success) => {
            if (!success) return;

            if (formValue.rememberEmail) {
                // save email
                this._localPersistence.setSecure(StorageKey.EMAIL, formValue.email);

                this.router.navigate(['expenses']);
            }
        });
    }
}
