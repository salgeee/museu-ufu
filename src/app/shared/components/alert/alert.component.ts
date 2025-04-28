import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { GetIconByStatePipe } from '@shared/pipes';
import { AlertEvent, AlertService } from './alert.service';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Componente AlertComponent é responsável por exibir mensagens de alerta com animações.
 * Ele escuta eventos de alerta do AlertService e gerencia o comportamento de exibição e fechamento automático dos alertas.
 * @example
 * <app-alert></app-alert>
 * @see AlertService
 * @public
 * {@link https://www.gov.br/ds/components/message?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [NgClass, GetIconByStatePipe],
	host: {
		class: 'alert-container',
	},
	templateUrl: './alert.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('scaleFadeIn', [
			transition(':enter', [
				style({
					transform: 'scale(0.8)',
					opacity: 0,
				}),
				animate(
					`500ms cubic-bezier(0.35, 0, 0.25, 1)`,
					style({
						transform: 'scale(1)',
						opacity: 1,
					})
				),
			]),
			transition(':leave', [style({ opacity: 1 }), animate(`300ms ease-in`, style({ opacity: 0 }))]),
		]),
	],
})
export class AlertComponent implements OnInit {
	/** Sinal para manter o evento de alerta atual */
	alert = signal<AlertEvent | null>(null);
	/** Instância do AlertService para se inscrever nos eventos de alerta */
	private alertService = inject(AlertService);

	constructor() {}

	/**
	 * Inicializa o componente inscrevendo-se nos eventos de alerta e eventos de limpeza do AlertService.
	 * @internal
	 */
	ngOnInit(): void {
		this.alertService.alertEvents$.subscribe(event => {
			this.alert.set(event);
			if (event.autoClose) this.registerCloseTime(event);
		});
		this.alertService.clearEvent$.subscribe(() => this.onHide());
	}

	/**
	 * Oculta o alerta definindo o sinal de alerta como null.
	 * @internal
	 */
	public onHide(): void {
		this.alert.set(null);
	}

	/**
	 * Registra um timeout para fechar automaticamente o alerta após a duração especificada.
	 * @param event - O evento de alerta contendo a duração e o closeTimeId.
	 * @internal
	 */
	protected registerCloseTime(event: AlertEvent): void {
		event.closeTimeId = setTimeout(() => this.onHide(), event.duration);
	}

	/**
	 * Limpa o timeout de fechamento automático quando o mouse entra no alerta.
	 * @param event - O evento de alerta contendo o closeTimeId.
	 * @internal
	 */
	public onMouseEnter(event: AlertEvent): void {
		if (!event.autoClose) return;
		clearTimeout(event.closeTimeId);
	}

	/**
	 * Re-registra o timeout de fechamento automático quando o mouse é pressionado no alerta.
	 * @internal
	 * @param event - O evento de alerta contendo o closeTimeId.
	 */
	public onMouseDown(event: AlertEvent): void {
		if (!event.autoClose) return;
		this.registerCloseTime(event);
	}
}
