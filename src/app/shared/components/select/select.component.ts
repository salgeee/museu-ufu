import {
	AfterViewInit,
	booleanAttribute,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	inject,
	Input,
	Output,
	Renderer2,
} from '@angular/core';
import BRSelect from '@govbr-ds/core/dist/components/select/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptions } from '../../models/select.model';

/**
 * Componente SelectComponent é responsável por exibir um seletor de itens.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-select [label]="'Selecione um item'" [id]="'select1'" [(ngModel)]="selectedItem"></app-select>
 * @public
 * {@link https://www.gov.br/ds/components/select?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-select',
	standalone: true,
	imports: [],
	templateUrl: './select.component.html',
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
})
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
	/**
	 * Rótulo do seletor.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do seletor.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string = '';

	/**
	 * Placeholder do campo de entrada.
	 * @type {string}
	 * @default 'Selecione o item'
	 */
	@Input() placeholder: string = 'Selecione o item';

	/**
	 * Dica de uso para o campo de entrada.
	 * @type {string}
	 */
	@Input() hint: string = '';

	/**
	 * Indica se o seletor está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Dados de opções do seletor.
	 * @type {SelectOptions}
	 */
	@Input() options: SelectOptions = [];

	/**
	 * Evento emitido quando o valor do seletor muda.
	 * @type {EventEmitter<string>}
	 */
	@Output() selectedEvent: EventEmitter<string> = new EventEmitter<string>();

	/** Instância do componente BRSelect. */
	instance: any;

	protected _value: string;

	/** Obtém o valor do seletor. */
	get value(): string {
		return this._value;
	}

	/** Define o valor do seletor. */
	set value(val: string) {
		if (this.disabled) return;
		this._value = val;
		this._change(val);
		this.selectedEvent.emit(val);
	}

	protected _touched: () => void = () => void undefined;

	protected _change: (value: string) => void = () => void undefined;

	/** Elemento BRSelect injetado. */
	private brSelect = inject(ElementRef);
	/** Renderer2 injetado para manipulação do DOM. */
	renderer = inject(Renderer2);

	constructor() {}

	/**
	 * Método do ciclo de vida do Angular chamado após a visualização ser inicializada.
	 * Inicializa a instância do componente BRSelect e popula o item selecionado.
	 * @internal
	 */
	ngAfterViewInit(): void {
		this.instance = new BRSelect('br-select', this.brSelect.nativeElement.querySelector('.br-select'));
		this._populateItemSelected();

		if (this.instance) {
			this.instance.resetOptionsList();
		}
	}

	/**
	 * Popula o item selecionado no seletor.
	 * @internal
	 */
	private _populateItemSelected(): void {
		const optionSelected = this.brSelect.nativeElement.querySelector('.br-item.selected');

		if (optionSelected) {
			this.renderer.removeClass(optionSelected, 'selected');
			const input = optionSelected.querySelector('input[type="radio"]');
			if (input) this.renderer.removeAttribute(input, 'checked');
		}

		if (this.value) {
			const optionValue = this.brSelect.nativeElement.querySelector(`div.br-item[data-value="${this.value}`);
			if (optionValue) this.renderer.addClass(optionValue, 'selected');
		}

		document.body.click();
	}

	setSelected() {
		if (this.disabled) return;
		this.value = this.instance.selectedValue;
	}

	writeValue(value: string): void {
		this.value = value;

		if (this.instance) {
			this._populateItemSelected();
			this.instance.resetOptionsList();
		}
	}

	setDisabledState(disabled: boolean): void {
		this.disabled = disabled;
	}

	registerOnChange(fn: (value: string) => void): void {
		this._change = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._touched = fn;
	}

	onBlur(): void {
		this._touched();
	}
}
