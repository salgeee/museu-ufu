import { booleanAttribute, Component, EventEmitter, forwardRef, Input, numberAttribute, Output } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
	AbstractControl,
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator,
	Validators,
} from '@angular/forms';
import { SizeOptions } from '../../types/size.type';

/**
 * Componente TextareaComponent é responsável por exibir um campo de texto multilinha.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-textarea [label]="'Digite algo'" [id]="'textarea1'" [(ngModel)]="text"></app-textarea>
 *
 * @public
 * {@link https://www.gov.br/ds/components/textarea?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-textarea',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet, FormsModule],
	templateUrl: './textarea.component.html',
	styleUrl: './textarea.component.scss',
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
})
export class TextareaComponent implements ControlValueAccessor, Validator {
	/**
	 * Rótulo do campo de texto.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do campo de texto.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string;

	/**
	 * Nome do campo de texto.
	 * @type {string}
	 */
	@Input() name: string = '';

	/**
	 * Tamanho do campo de texto.
	 * @type {SizeOptions}
	 * @default 'medium'
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Placeholder do campo de texto.
	 * @type {string}
	 */
	@Input() placeholder: string = '';

	/**
	 * Dica de uso para o campo de texto.
	 * @type {string}
	 */
	@Input() hint: string = '';

	/**
	 * Indica se o campo de texto está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Indica se o campo de texto é somente leitura.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) readonly: boolean = false;

	/**
	 * Indica se o limite de caracteres deve ser exibido.
	 * @type {boolean}
	 * @default true
	 */
	@Input({ transform: booleanAttribute }) showLimit: boolean = true;

	/**
	 * Indica se o contador de caracteres deve ser exibido.
	 * @type {boolean}
	 * @default true
	 */
	@Input({ transform: booleanAttribute }) showCounter: boolean = true;

	/**
	 * Comprimento máximo do campo de texto.
	 * @type {number}
	 */
	@Input({ transform: numberAttribute }) maxLength: number;

	/**
	 * Obtém se o campo de texto é obrigatório.
	 * @type {boolean}
	 */
	get required(): boolean {
		return this._required ?? this.control?.hasValidator(Validators.required) ?? false;
	}

	/**
	 * Define se o campo de texto é obrigatório.
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute })
	set required(value: boolean) {
		this._required = value;
	}

	/**
	 * Evento emitido quando o valor do campo de texto muda.
	 * @type {EventEmitter<string>}
	 */
	@Output() textChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Controle do formulário associado ao campo de texto.
	 * @type {AbstractControl}
	 */
	public control?: AbstractControl;

	protected _required: boolean | undefined;

	protected _value = '';

	/**
	 * Obtém o valor do campo de texto.
	 * @type {string}
	 */
	get value(): string {
		return this._value;
	}

	/**
	 * Define o valor do campo de texto.
	 * @type {string}
	 */
	set value(val: string) {
		if (this.disabled) return;
		this._value = val;
		this._change(val);
	}

	protected _touched: () => void = () => void undefined;

	protected _validate: () => void = () => void undefined;

	protected _change: (value: string) => void = () => void undefined;

	validate(control: AbstractControl): ValidationErrors | null {
		this.control = control;
		return control.errors;
	}

	writeValue(value: string): void {
		this.value = value;
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

	registerOnValidatorChange?(fn: () => void): void {
		this._validate = fn;
	}

	onChange(event: Event) {
		if (!this.disabled && (event.target as HTMLTextAreaElement).value) {
			this.textChange.emit(this.value);
		}
	}

	public onBlur(): void {
		this._touched();
	}
}
