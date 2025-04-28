import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { SizeOptions } from '../../types/size.type';
import { NgClass } from '@angular/common';

/**
 * Componente SwitchComponent é responsável por exibir um interruptor com várias opções de configuração.
 * @example
 * <app-switch [label]="'Ativar'" [id]="'switch1'" [(ngModel)]="isActive"></app-switch>
 *
 * @public
 * {@link https://www.gov.br/ds/components/switch?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-switch',
	standalone: true,
	imports: [NgClass],
	templateUrl: './switch.component.html',
})
export class SwitchComponent {
	/**
	 * Rótulo do interruptor.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do interruptor.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string = '';

	/**
	 * Dica de uso quando o interruptor está ativo.
	 * @type {string}
	 */
	@Input() hintActive: string = '';

	/**
	 * Dica de uso quando o interruptor está inativo.
	 * @type {string}
	 */
	@Input() hintInactive: string = '';

	/**
	 * Tamanho do interruptor.
	 * @type {SizeOptions}
	 * @default 'medium'
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Indica se o interruptor deve exibir um ícone.
	 * @default false
	 */
	@Input({ transform: booleanAttribute, alias: 'showIcon' }) icon = false;

	/**
	 * Indica se o interruptor está desabilitado.
	 * @default false
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Indica se o interruptor está marcado.
	 * @default false
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) checked: boolean = false;

	/**
	 * Posição do interruptor.
	 * @type {'left' | 'right' | 'top'}
	 * @default 'left'
	 */
	@Input() position: 'left' | 'right' | 'top' = 'left';

	private _value = this.checked;

	/** Obtém o valor do interruptor. */
	@Input()
	get value(): boolean {
		return this._value;
	}

	/** Define o valor do interruptor. */
	set value(val: boolean) {
		if (this.disabled) return;
		this._value = val;
		this.valueChange.emit(val);
	}

	/** Evento emitido quando o valor do interruptor muda. */
	@Output() valueChange = new EventEmitter<boolean>();

	/**
	 * Alterna o valor do interruptor.
	 * @internal
	 */
	toggle() {
		this.value = !this.value;
	}
}
