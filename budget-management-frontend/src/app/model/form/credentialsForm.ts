import { FormControl } from '@angular/forms';

export interface CredentialsForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    rememberEmail: FormControl<boolean | null>;
}
