import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const KEY_NO_AUTH = 'noAuth';

export const authInterceptor: HttpInterceptorFn = (
	req: HttpRequest<any>,
	next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
	let clonedRequest = req;
	const authService = inject(AuthService);

	if (clonedRequest.params.has(KEY_NO_AUTH)) {
		clonedRequest = clonedRequest.clone({
			params: clonedRequest.params.delete(KEY_NO_AUTH),
		});
	} else if (authService.isAuthenticated && !clonedRequest.url.includes('assets')) {
		clonedRequest = clonedRequest.clone({
			setHeaders: {
				Authorization: `Bearer ${authService.credentials()?.accessToken}`,
			},
		});
	}

	return next(clonedRequest).pipe(catchError(error => errorHandler(error, authService)));
};

function errorHandler(response: HttpErrorResponse, authService: AuthService): Observable<HttpEvent<unknown>> {
	if (response.status === HttpStatusCode.Unauthorized) {
		authService.logout();
	}

	return throwError(() => response);
}
