import {
	AfterViewInit,
	booleanAttribute,
	Component,
	ElementRef,
	forwardRef,
	inject,
	Input,
	OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import BRDateTimePicker from '@govbr-ds/core/dist/components/datetimepicker/datetimepicker';

export const TYPE_DATE_PICKER = {
	date: 'text',
	time: 'time',
	date_time: 'datetime-local',
};

export type TypesDatePicker = keyof typeof TYPE_DATE_PICKER;

/**
 * Componente DateTimePickerComponent é responsável por exibir um seletor de data e hora.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-date-time-picker [label]="'Data e Hora'" [id]="'datetimepicker1'" [(ngModel)]="selectedDate"></app-date-time-picker>
 *
 * @public
 * {@link https://www.gov.br/ds/components/datetimepicker?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-date-time-picker',
	standalone: true,
	imports: [NgClass, FormsModule],
	templateUrl: './date-time-picker.component.html',
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateTimePickerComponent), multi: true }],
})
export class DateTimePickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
	/**
	 * Rótulo do componente DateTimePicker.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do componente DateTimePicker.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string;

	/**
	 * Indica se o componente deve permitir seleção de intervalo.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) range: boolean = false;

	/**
	 * Indica se o componente está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Data mínima permitida para seleção.
	 * @type {Date | string}
	 */
	@Input() minDate: Date | string;

	/**
	 * Data máxima permitida para seleção.
	 * @type {Date | string}
	 */
	@Input() maxDate: Date | string;

	/**
	 * Placeholder do campo de entrada.
	 * @type {string}
	 */
	@Input() placeholder: string = '';

	/**
	 * Dica de uso para o campo de entrada.
	 * @type {string}
	 */
	@Input() hint: string = '';

	/**
	 * Obtém o tipo de seletor de data/hora.
	 * @type {string}
	 */
	get type(): string {
		return TYPE_DATE_PICKER[this._type];
	}

	/**
	 * Define o tipo de seletor de data/hora.
	 * @type {TypesDatePicker}
	 */
	@Input()
	set type(value: TypesDatePicker) {
		this._type = value;
	}

	/**
	 * Tipo de seletor de data/hora.
	 * @type {TypesDatePicker}
	 * @default 'date'
	 * @private
	 */
	private _type: TypesDatePicker = 'date';

	/**
	 * Obtém se o campo de entrada é obrigatório.
	 * @type {boolean}
	 */
	get required(): boolean {
		return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
	}

	/**
	 * Define se o campo de entrada é obrigatório.
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute })
	set required(value: boolean) {
		this._required = value;
	}

	/**
	 * Valor do campo de entrada.
	 * @type {string}
	 * @protected
	 */
	protected _value: string;

	/**
	 * Obtém o valor do campo de entrada.
	 * @type {string}
	 */
	get value(): string {
		return this._value;
	}

	/**
	 * Define o valor do campo de entrada.
	 * @type {string}
	 */
	set value(val: string) {
		if (this.disabled) return;
		this._value = val;
		this._change(val);
	}

	/** Controle abstrato do Angular Forms. */
	public control?: AbstractControl;

	protected _required: boolean | undefined;

	protected _touched: () => void = () => void undefined;

	protected _change: (value: string) => void = () => void undefined;

	protected readonly TypeDatePicker = TYPE_DATE_PICKER;
	instance: unknown;

	private brDatePicker = inject(ElementRef);

	constructor() {}

	/**
	 * Método do ciclo de vida do Angular chamado após a visualização ser inicializada.
	 * Inicializa a instância do componente BRDateTimePicker.
	 * @internal
	 */
	ngAfterViewInit(): void {
		let dates = {};
		if (this.maxDate) {
			dates = {
				maxDate: this.normalizeDate(this.maxDate),
			};
		}
		if (this.minDate) {
			dates = {
				...dates,
				minDate: this.normalizeDate(this.minDate),
			};
		}
		this.instance = new BRDateTimePicker(
			'br-datetimepicker',
			this.brDatePicker.nativeElement.querySelector('.br-datetimepicker'),
			{
				...dates,
			}
		);
	}

	/**
	 * Normaliza a data para o formato 'DD/MM/YYYY'.
	 * @param date - A data a ser normalizada.
	 * @returns A data normalizada no formato 'DD/MM/YYYY'.
	 * @internal
	 */
	normalizeDate(date: string | Date): string {
		if (date instanceof Date) {
			return dayjs(date).format('DD/MM/YYYY');
		}
		if (!date) return date;
		const [day, month, year] = date.split('/');
		return dayjs(`${year}-${day}-${month}`).format('DD/MM/YYYY');
	}

	/**
	 * @internal
	 */
	ngOnInit(): void {
		this.mountPlaceholder();
	}

	/**
	 * Configura o placeholder do campo de entrada com base no tipo e se é um intervalo.
	 * @internal
	 */
	mountPlaceholder() {
		if (this.placeholder) return;

		if (this.range) {
			this.placeholder =
				this.type === TYPE_DATE_PICKER.date_time
					? 'exemplo: 02/02/2024 02:02 até 03/02/2025 02:02'
					: 'exemplo: 02/02/2024 até 03/02/2025';
		} else if (this.type === TYPE_DATE_PICKER.date) {
			this.placeholder = 'exemplo: 02/02/2024';
		} else if (this.type === TYPE_DATE_PICKER.time) {
			this.placeholder = 'exemplo: 02:40';
		} else {
			this.placeholder = 'exemplo: 02/02/2024 02:02';
		}
	}

	writeValue(value: string): void {
		this.value = this.normalizeDate(value);
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
