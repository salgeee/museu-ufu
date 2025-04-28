import {
	AfterViewInit,
	booleanAttribute,
	Directive,
	ElementRef,
	inject,
	Input,
	OnDestroy,
	Renderer2,
} from '@angular/core';
import { getIconByStateUtils, StateType } from '../../utils/get-icon-by-state.utils';

/**
 * Diretiva FeedbackDirective é responsável por exibir um feedback visual de estado.
 * @example
 * <span br-feedback state="success">Mensagem de sucesso</span>
 * @public
 * {@link https://www.gov.br/ds/components/feedback?tab=desenvolvedor|Documentação oficial}
 */
@Directive({
	selector: 'span[br-feedback]',
	standalone: true,
	host: {
		class: 'feedback',
		role: 'alert',
	},
})
export class FeedbackDirective implements AfterViewInit, OnDestroy {
	/**
	 * Define o estado do feedback visual.
	 * @type {StateType}
	 * @default ''
	 */
	@Input() state: StateType = '';
	/**
	 * Define se o estado deve ser propagado para o elemento pai.
	 * @default false
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) noPropagateState: boolean = false;
	node: HTMLDivElement;
	el = inject(ElementRef);
	renderer = inject(Renderer2);

	constructor() {}

	ngAfterViewInit(): void {
		this.node = this.renderer.parentNode(this.el.nativeElement) as HTMLDivElement;

		if (this.state) {
			this.setState();
			this.setIcon();
		}
	}

	private setState(): void {
		if (!this.noPropagateState && this.node) this.node.classList.add(this.state);
		this.renderer.addClass(this.el.nativeElement, this.state);
	}

	private setIcon(): void {
		const icon = this.renderer.createElement('i');

		this.renderer.addClass(icon, 'fas');
		this.renderer.addClass(icon, getIconByStateUtils(this.state));
		this.renderer.setAttribute(icon, 'aria-hidden', 'true');

		this.renderer.insertBefore(this.el.nativeElement, icon, this.el.nativeElement.firstChild);
	}

	ngOnDestroy(): void {
		if (this.node) {
			this.node.classList.remove(this.state);
		}
		if (this.el.nativeElement) {
			this.renderer.removeClass(this.el.nativeElement, this.state);
		}
	}
}
