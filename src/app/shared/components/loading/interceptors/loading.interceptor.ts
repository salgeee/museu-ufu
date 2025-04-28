import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Chave para indicar que a requisição não deve exibir o overlay de carregamento.
 * @type {string}
 * @example
 * const params = new HttpParams().set(KEY_NO_LOADING, 'true');
 * this.http.get('https://api.com', { params });
 */
export const KEY_NO_LOADING: string = 'noLoading';

/**
 * Interceptor que exibe o overlay de carregamento quando uma requisição está em andamento.
 * @param req {HttpRequest<any>} Requisição HTTP
 * @param next {HttpHandlerFn} Manipulador HTTP
 * @returns {Observable<HttpEvent<any>>}
 */
export const loadingInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
	let clonedRequest = req;
	const loadingService = inject(LoadingService);

	if (!clonedRequest.params.has(KEY_NO_LOADING)) {
		loadingService.setLoading(true, clonedRequest.url);
	} else {
		clonedRequest = clonedRequest.clone({
			params: clonedRequest.params.delete(KEY_NO_LOADING),
		});
	}

	return next(req).pipe(finalize(() => loadingService.setLoading(false, clonedRequest.url)));
};
