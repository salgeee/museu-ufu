import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	forwardRef,
	Input,
	Output,
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { RadioOptions } from '@shared/models/radio.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Componente RadioComponent é responsável por exibir um grupo de opções de rádio.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-radio [options]="[{ label: 'Opção 1', value: 1 }, { label: 'Opção 2', value: 2 }]" [(ngModel)]="selectedOption"></app-radio>
 *
 * @public
 * {@link https://www.gov.br/ds/components/radio?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-radio',
	standalone: true,
	imports: [NgTemplateOutlet, NgClass],
	templateUrl: './radio.component.html',
	styleUrl: './radio.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioComponent), multi: true }],
})
export class RadioComponent implements ControlValueAccessor {
	/**
	 * Opções de rádio.
	 * @type {RadioOptions}
	 */
	@Input() options: RadioOptions = [];

	/**
	 * Rótulo do grupo de rádio.
	 * @type {string}
	 */
	@Input() label: string = '';

	/**
	 * Dica de uso para o grupo de rádio.
	 * @type {string}
	 */
	@Input() hint: string = '';

	/**
	 * Indica se o grupo de rádio deve ser exibido horizontalmente.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) horizontal: boolean = false;

	@Input()
	get value(): string | number {
		return this._value;
	}

	set value(val: string | number) {
		this._value = val;
		this.valueChange.emit(val);
		this._change(val);
	}

	private _value: string | number = '';

	@Output() valueChange = new EventEmitter<string | number>();

	protected _touched: () => void = () => void undefined;

	protected _change: (value: string | number) => void = () => void undefined;

	onChange(value: string | number) {
		this.value = value;
	}

	writeValue(obj: string | number): void {
		this.value = obj;
	}

	registerOnChange(fn: (value: string | number) => void): void {
		this._change = fn;
	}

	registerOnTouched(fn: () => void): void {
		this._touched = fn;
	}
}
