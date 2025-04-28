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
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import BRInput from '@govbr-ds/core/dist/components/input/input';
import { SizeOptions } from '../../types/size.type';
import { NgxMaskDirective } from 'ngx-mask';

/**
 * Componente InputComponent é responsável por exibir um campo de entrada com várias opções de configuração.
 * Implementa a interface ControlValueAccessor para integração com formulários Angular.
 * @example
 * <app-input [label]="'Nome'" [id]="'input1'" [(ngModel)]="name"></app-input>
 *
 * @public
 * {@link https://www.gov.br/ds/components/input?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-input',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet, FormsModule, NgxMaskDirective],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
	/**
	 * Rótulo do campo de entrada.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string = '';

	/**
	 * ID do campo de entrada.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string;

	/**
	 * Nome do campo de entrada.
	 * @type {string}
	 */
	@Input() name: string = '';

	/**
	 * Tamanho do campo de entrada.
	 * @type {SizeOptions}
	 * @default 'medium'
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Tipo do campo de entrada.
	 * @type {'text' | 'password' | 'email' | 'number'}
	 * @default 'text'
	 */
	@Input() type: 'text' | 'password' | 'email' | 'number' = 'text';

	/**
	 * Estado do campo de entrada.
	 * @type {'success' | 'danger' | 'info' | 'warning' | ''}
	 * @default ''
	 */
	@Input() state: 'success' | 'danger' | 'info' | 'warning' | '' = '';

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
	 * Autocomplete do campo de entrada.
	 * @type {string}
	 * @default 'off'
	 */
	@Input() autocomplete: string = 'off';

	/**
	 * Feedback do campo de entrada.
	 * @type {string}
	 */
	@Input() feedback: string = '';

	/**
	 * Máscara do campo de entrada.
	 * @type {string}
	 */
	@Input() mask: string = '';

	/**
	 * Indica se o campo de entrada possui botão.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) hasButton: boolean = false;

	/**
	 * Indica se o campo de entrada deve ser destacado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) highlight: boolean = false;

	/**
	 * Indica se o campo de entrada é somente leitura.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) readonly: boolean = false;

	/**
	 * Indica se o campo de entrada está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Indica se o campo de entrada possui ícone.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) hasIcon: boolean = false;

	/**
	 * Ícone do campo de entrada.
	 * @type {string}
	 * @default 'fas fa-search'
	 */
	@Input() icon: string = 'fas fa-search';

	/**
	 * Comprimento máximo do campo de entrada.
	 * @type {number}
	 */
	@Input() maxLength: number;

	/**
	 * Valor mínimo do campo de entrada.
	 * @type {number | string}
	 */
	@Input() min: number | string;

	/**
	 * Valor máximo do campo de entrada.
	 * @type {number | string}
	 */
	@Input() max: number | string;

	/**
	 * Padrão do campo de entrada.
	 * @type {string}
	 */
	@Input() pattern: string;

	/**
	 * Passo do campo de entrada.
	 * @type {number}
	 */
	@Input() step: number;

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

	protected _required: boolean | undefined;

	/**
	 * Evento emitido quando o valor do campo de entrada muda.
	 * @type {EventEmitter<string>}
	 */
	@Output() change: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Evento emitido quando o botão do campo de entrada é clicado.
	 * @type {EventEmitter<void>}
	 */
	@Output() clickButton: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Controle do formulário associado ao campo de entrada.
	 * @type {AbstractControl}
	 */
	public control?: AbstractControl;

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
	protected _touched: () => void = () => void undefined;

	protected _change: (value: string) => void = () => void undefined;

	instance: unknown;
	private brInput = inject(ElementRef);

	constructor() {}

	/**
	 * Método do ciclo de vida do Angular chamado após a visualização ser inicializada.
	 * Inicializa a instância do componente BRInput.
	 * @internal
	 */
	ngAfterViewInit(): void {
		this.instance = new BRInput('br-input', this.brInput.nativeElement.querySelector('.br-input'));
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

	onBlur(): void {
		this._touched();
	}

	/**
	 * Manipulador de evento para mudança no valor do campo de entrada.
	 * @param event - O evento de mudança.
	 * @internal
	 */
	onChangeInput(event: Event) {
		if (!this.disabled && (event.target as HTMLInputElement).value) {
			this.change.emit(this.value);
		}
	}

	/**
	 * Manipulador de evento para clique no botão do campo de entrada.
	 * @param event - O evento de clique.
	 * @internal
	 */
	onClickButton(event: MouseEvent) {
		event.stopPropagation();
		if (!this.disabled) {
			this.clickButton.emit();
		}
	}
}
