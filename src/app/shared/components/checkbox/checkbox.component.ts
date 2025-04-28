import { booleanAttribute, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Componente CheckboxComponent é responsável por exibir um checkbox com estado e rótulo.
 * @
 * @example
 * <app-checkbox [label]="'Aceitar termos'" [id]="'checkbox1'" [(value)]="isChecked"></app-checkbox>
 *
 * @public
 * {@link https://www.gov.br/ds/components/checkbox?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-checkbox',
	standalone: true,
	imports: [],
	host: {
		class: 'br-checkbox',
		'[class.valid]': 'state === "valid"',
		'[class.invalid]': 'state === "invalid"',
	},
	templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
	/**
	 * Estado do checkbox.
	 * @type {'valid' | 'invalid' | ''}
	 * @default ''
	 * @optional
	 */
	@Input() state: 'valid' | 'invalid' | '' = '';
	/**
	 * Rótulo do checkbox.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';
	/**
	 * ID do checkbox.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string = '';
	/**
	 * Indica se o checkbox está desabilitado.
	 * @default false
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;
	/**
	 * Indica se o checkbox está marcado.
	 * @default false
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) checked: boolean = false;

	/** Classe CSS para o estado desabilitado. */
	@HostBinding('class.disabled') get disabledClass() {
		return this.disabled;
	}

	private _value = this.checked;

	/**
	 * Obtém o valor do checkbox.
	 * @returns O valor atual do checkbox.
	 */
	@Input()
	get value(): boolean {
		return this._value;
	}

	/**
	 * Define o valor do checkbox.
	 * @param val - O novo valor do checkbox.
	 */
	set value(val: boolean) {
		if (this.disabled) return;
		this._value = val;
	}

	/** Evento emitido quando o valor do checkbox muda. */
	@Output() valueChange = new EventEmitter<boolean>();

	/**
	 * Manipulador de evento para mudança de estado do checkbox.
	 * @param event - O evento de mudança.
	 * @internal
	 */
	onChangeCheck(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target) this.value = target.checked;
		this.valueChange.emit(this.value);
	}
}
