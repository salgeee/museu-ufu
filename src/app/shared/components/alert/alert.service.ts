import { Injectable } from '@angular/core';
import { StateType } from '@shared/utils';
import { Subject } from 'rxjs';

/**
 * Representa um evento de alerta.
 */
export type AlertEvent = {
	/** Tipo do estado do alerta. */
	type: StateType;
	/** Mensagem do alerta. */
	message: string;
	/** Título opcional do alerta. */
	title?: string;
	/** Duração opcional do alerta em milissegundos. */
	duration?: number;
	/** Indica se o alerta deve fechar automaticamente. */
	autoClose?: boolean;
	/** ID do timeout para fechamento automático do alerta. */
	closeTimeId?: any;
	/** Indica se o alerta pode ser fechado manualmente. */
	closable?: boolean;
};

/**
 * Serviço para exibir alertas na aplicação.
 * @public
 * @example
 * // Exemplo de uso do serviço de alerta.
 * private alertService = inject(AlertService);
 * alertService.showAlert('success', 'Operação realizada com sucesso.');
 */
@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private readonly _alert = new Subject<AlertEvent>();
	private readonly _clear = new Subject<void>();

	/** Observable para eventos de alerta. */
	public get alertEvents$() {
		return this._alert.asObservable();
	}

	/**
	 * Define e emite um novo evento de alerta.
	 * @internal
	 * */
	private set alertEvents(value: AlertEvent) {
		this._alert.next(value);
	}

	/**
	 * Observable para eventos de limpeza de alerta.
	 * @internal
	 * */
	public get clearEvent$() {
		return this._clear.asObservable();
	}

	/**
	 * Exibe um alerta com as propriedades especificadas.
	 * @param type - Tipo do estado do alerta.
	 * @param message - Mensagem do alerta.
	 * @param title - Título opcional do alerta.
	 * @param autoClose - Indica se o alerta deve fechar automaticamente.
	 * @param duration - Duração opcional do alerta em milissegundos.
	 * @param closable - Indica se o alerta pode ser fechado manualmente.
	 * @param delay - Atraso opcional antes de exibir o alerta.
	 */
	public showAlert(
		type: StateType,
		message: string,
		title?: string,
		autoClose = true,
		duration = 4000,
		closable = true,
		delay = 0
	): void {
		if (delay) {
			setTimeout(() => {
				this.alertEvents = { type, message, title, duration, autoClose, closable };
			}, delay);
		} else {
			this.alertEvents = { type, message, title, duration, autoClose, closable };
		}
	}

	/** Limpa todos os alertas emitindo um evento de limpeza. */
	public clearAlerts(): void {
		this._clear.next();
	}
}
