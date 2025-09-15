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
import { AlertService } from '@shared/components/alert/alert.service';
import { StateType } from '@shared/utils/get-icon-by-state.utils';


export const KEY_HIDE_NOTIFICATION = 'hideNotification';

export const globalInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  // 1. Injete o AlertService AQUI, no contexto correto.
  const alertService = inject(AlertService);

  let clonedRequest = req;

  if (clonedRequest.params.has(KEY_HIDE_NOTIFICATION)) {
    clonedRequest = clonedRequest.clone({
      params: clonedRequest.params.delete(KEY_HIDE_NOTIFICATION),
    });
    return next(clonedRequest);
  }

  // 2. Passe a instância do alertService para o errorHandler.
  return next(clonedRequest).pipe(catchError(error => errorHandler(error, alertService)));
};

// 3. Modifique a assinatura do errorHandler para receber o alertService.
function errorHandler(response: HttpErrorResponse, alertService: AlertService): Observable<HttpEvent<unknown>> {
  let errorMessage: string = '';
  const traceId = response.error?.traceId || '';

  if (response.error && response.error.detail) { // <-- API FastAPI geralmente usa 'detail'
    errorMessage = response.error.detail;
  } else if (response.error && response.error.message) {
    errorMessage = response.error.message;
  }

  // 4. Passe o alertService para a função showErrorMessages.
  switch (response.status) {
    case 0:
      showErrorMessages(alertService, errorMessage, traceId, 'Problemas com conexão com o servidor.');
      break;
    case HttpStatusCode.BadRequest:
      showErrorMessages(alertService, errorMessage, traceId, 'Ocorreu um erro inesperado de servidor.', 'warning');
      break;
    case HttpStatusCode.Unauthorized:
      showErrorMessages(alertService, errorMessage, traceId, 'Usuário sem acesso, por favor logue novamente!');
      break;
    case HttpStatusCode.Forbidden:
      showErrorMessages(alertService, errorMessage, traceId, 'Acesso negado, você não tem permissão para realizar essa operação!');
      break;
    // ... outros casos
    default:
      showErrorMessages(alertService, errorMessage, traceId, 'Ocorreu um erro inesperado de servidor.');
      break;
  }

  return throwError(() => response);
}

// 5. Modifique a assinatura de showErrorMessages para receber a instância, em vez de injetá-la.
function showErrorMessages(alertService: AlertService, message: string, traceId: string, defaultMessage?: string, type: StateType = 'danger') {
  // A injeção foi removida daqui.
  alertService.showAlert(type, message || defaultMessage, 'Alerta!', true, 5000);
}
