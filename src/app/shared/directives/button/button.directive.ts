import { booleanAttribute, Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { SizeOptions } from '../../types/size.type';

/**
 * Diretiva para estilizar botões com várias opções.
 *
 * @selector button[br-button], a[br-button]
 * @standalone true
 */
@Directive({
	selector: 'button[br-button], a[br-button]',
	host: {
		'[class.primary]': 'color === "primary"',
		'[class.secondary]': 'color === "secondary"',
		'[class.tertiary]': 'color === "tertiary"',
		'[class.small]': 'size === "small"',
		'[class.medium]': 'size === "medium"',
		'[class.large]': 'size === "large"',
		'[class.disabled]': 'disabled',
		'[class.block]': 'block',
		'[class.loading]': 'loading',
		'[class.active]': 'active',
		'[class.circle]': 'circle',
		'[class.dark-mode]': 'inverted',
		'[disabled]': 'disabled',
		'[class.br-button]': 'true',
		role: 'button',
	},
	inputs: ['color', 'size', 'disabled', 'block', 'loading', 'active', 'circle', 'inverted'],
	standalone: true,
})
export class ButtonDirective implements OnInit {
	/**
	 * Cor do botão.
	 * @type {'primary' | 'secondary' | 'tertiary'}
	 * @default 'primary'
	 */
	@Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';

	/**
	 * Tamanho do botão.
	 * @type {SizeOptions}
	 * @default 'medium'
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Classe do ícone para o botão.
	 * @type {string}
	 */
	@Input() icon: string = '';

	/**
	 * Conjunto de fontes para o ícone.
	 * @type {string}
	 * @default 'fas'
	 */
	@Input() fontSet: string = 'fas';

	/**
	 * Posição do ícone em relação ao texto do botão.
	 * @type {'before' | 'after'}
	 * @default 'before'
	 */
	@Input() positionIcon: 'before' | 'after' = 'before';

	/**
	 * Indica se o botão está desabilitado.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) disabled: boolean = false;

	/**
	 * Indica se o botão deve ser exibido como um elemento de bloco.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) block: boolean = false;

	/**
	 * Indica se o botão está em estado de carregamento.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) loading: boolean = false;

	/**
	 * Indica se o botão está ativo.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) active: boolean = false;

	/**
	 * Indica se o botão deve ser exibido como um círculo.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) circle: boolean = false;

	/**
	 * Indica se o botão deve ser exibido no modo escuro.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) inverted: boolean = false;

	public el = inject(ElementRef);
	public renderer = inject(Renderer2);

	constructor() {}

	ngOnInit(): void {
		this.setIcon();
	}

	setIcon(): void {
		if (!this.icon) return;

		const icon = this.createIcon();

		if (this.positionIcon === 'after') {
			this.renderer.appendChild(this.el.nativeElement, icon);
		} else {
			this.renderer.insertBefore(this.el.nativeElement, icon, this.el.nativeElement.firstChild);
		}
	}

	createIcon(): HTMLElement {
		const icon = this.renderer.createElement('i');

		this.renderer.addClass(icon, this.fontSet);
		this.renderer.addClass(icon, this.icon);
		this.renderer.setAttribute(icon, 'aria-hidden', 'true');
		return icon;
	}
}
