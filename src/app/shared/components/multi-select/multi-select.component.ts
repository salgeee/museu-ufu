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
import { SelectOption } from '../../models/select.model';

/**
 * Componente MultiSelectComponent é responsável por exibir um seletor múltiplo de itens.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-multi-select [label]="'Selecione Itens'" [id]="'multiSelect1'" [(ngModel)]="selectedItems"></app-multi-select>
 *
 * @public
 * {@link https://www.gov.br/ds/components/select?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-multi-select',
	standalone: true,
	imports: [],
	templateUrl: './multi-select.component.html',
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MultiSelectComponent), multi: true }],
})
export class MultiSelectComponent implements AfterViewInit, ControlValueAccessor {
	/**
	 * Rótulo do seletor múltiplo.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do seletor múltiplo.
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
	 * Indica se o seletor múltiplo está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Dados de opções do seletor múltiplo.
	 * @type {SelectOption[]}
	 */
	@Input() options: SelectOption[] = [];

	/**
	 * Evento emitido quando os itens selecionados mudam.
	 * @type {EventEmitter<Array<string>>}
	 */
	@Output() selectedEvent: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

	/** Instância do componente BRSelect. */
	instance: any;

	protected _value: Array<string>;

	/** Obtém o valor do seletor múltiplo. */
	get value(): Array<string> {
		return this._value;
	}

	/** Define o valor do seletor múltiplo. */
	set value(val: Array<string>) {
		let aux = val;
		if (!Array.isArray(aux)) {
			aux = [aux];
		}
		this._value = aux;
		this._change(aux);
		this.selectedEvent.emit(aux);
	}

	protected _touched: () => void = () => void undefined;

	protected _change: (value: Array<string>) => void = () => void undefined;

	private brSelect = inject(ElementRef);
	private renderer = inject(Renderer2);

	constructor() {}

	/**
	 * Método do ciclo de vida do Angular chamado após a visualização ser inicializada.
	 * Inicializa a instância do componente BRSelect e popula os itens selecionados.
	 * @internal
	 */
	ngAfterViewInit(): void {
		this.instance = new BRSelect('br-select', this.brSelect.nativeElement.querySelector('.br-select'));
		this._populateItensSelected();

		if (this.instance) {
			this.instance.resetOptionsList();
		}
	}

	/**
	 * Popula os itens selecionados no seletor.
	 * @internal
	 */
	private _populateItensSelected(): void {
		const values = this.value;
		this._resetOptions();

		if (Array.isArray(values) && values.length > 0) {
			values.forEach(value => {
				if (value)
					this.renderer.setAttribute(
						this.brSelect.nativeElement.querySelector(`input[type="checkbox"][value="${value}"]`),
						'checked',
						''
					);
			});
		}

		document.body.click();
	}

	private _resetOptions(): void {
		const items = this.brSelect.nativeElement.querySelectorAll('.br-item');
		items.forEach((item: HTMLElement) => {
			this.renderer.removeClass(item, 'selected');
		});

		const checkboxes = this.brSelect.nativeElement.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach((checkbox: HTMLInputElement) => {
			this.renderer.removeAttribute(checkbox, 'checked');
		});
	}

	setSelected() {
		if (this.disabled) return;
		this.value = this.instance.selectedValue;
	}

	writeValue(value: Array<string>): void {
		this.value = value;

		if (this.instance) {
			this._populateItensSelected();
			this.instance.resetOptionsList();
		}
	}

	setDisabledState(disabled: boolean): void {
		this.disabled = disabled;
	}

	registerOnChange(fn: (value: Array<string>) => void): void {
		this._change = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._touched = fn;
	}

	onBlur(): void {
		this._touched();
	}
}
