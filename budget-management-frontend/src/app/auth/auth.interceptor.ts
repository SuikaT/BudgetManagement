// auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

const tokenExcludedEndpoints: string[] = ["/auth/authenticate"];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const _auth = inject(AuthService);

    // check if token should be skipped
    const skipToken = tokenExcludedEndpoints.some((endpoint) => req.url.includes(endpoint));
    if (!_auth.token || skipToken) {
        return next(req);
    }

    return next(
        req.clone({
            setHeaders: {
                Authorization: `Bearer ${_auth.token}`,
            },
        }),
    );
};
