import {
	booleanAttribute,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	numberAttribute,
	OnChanges,
	Output,
} from '@angular/core';

/**
 * Representa um evento de página.
 */
export type PageEvent = {
	/** Comprimento total dos itens. */
	length: number;
	/** Índice da página atual. */
	pageIndex: number;
	/** Tamanho da página. */
	pageSize: number;
	/** Índice da página anterior. */
	previousPageIndex: number;
};

/**
 * Componente PaginatorComponent é responsável por exibir um paginador com várias opções de configuração.
 * Implementa a interface OnChanges para detectar mudanças nas entradas.
 * @example
 * <app-paginator [length]="100" [pageSize]="10" (page)="onPageChange($event)"></app-paginator>
 *
 * @public
 * {@link https://www.gov.br/ds/components/pagination?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-paginator',
	standalone: true,
	imports: [],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnChanges {
	/**
	 * Comprimento total dos itens.
	 * @type {number}
	 * @required
	 */
	@Input({ transform: numberAttribute, required: true }) length: number;

	/**
	 * Tamanho da página.
	 * @type {number}
	 */
	@Input({ transform: numberAttribute }) pageSize: number;

	private _pageIndex: number = 1;

	/**
	 * Obtém o índice da página atual.
	 * @type {number}
	 */
	get pageIndex(): number {
		return this._pageIndex;
	}

	/**
	 * Define o índice da página atual.
	 * @type {number}
	 */
	@Input({ transform: numberAttribute })
	set pageIndex(value: number) {
		this._pageIndex = value;
	}

	/**
	 * Opções de tamanho da página.
	 * @type {number[]}
	 */
	@Input() pageSizeOptions: number[];

	/**
	 * Indica se os botões de primeira e última página devem ser exibidos.
	 * @type {boolean}
	 */
	@Input({ transform: booleanAttribute }) showFirstLastButtons: boolean;

	/**
	 * Evento emitido quando a página muda.
	 * @type {EventEmitter<PageEvent>}
	 */
	@Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

	expandedOptions = false;
	totalPages: number;
	pageIndexOptions: number[] = [];
	previousPageIndex: number;
	readonly uuid = Math.random().toString(36).substring(6);

	private brPaginator = inject(ElementRef);

	/**
	 * Método do ciclo de vida do Angular chamado quando as entradas mudam.
	 * Calcula o número total de páginas.
	 * @internal
	 */
	ngOnChanges(): void {
		this.calculatePages();
	}

	/**
	 * Navega para a página anterior.
	 * @internal
	 */
	prevPage() {
		this.previousPageIndex = this.pageIndex;
		this.pageIndex--;
		this.emitPageEvent();
	}

	/**
	 * Navega para a próxima página.
	 * @internal
	 */
	nextPage() {
		this.previousPageIndex = this.pageIndex;
		this.pageIndex++;
		this.emitPageEvent();
	}

	/**
	 * Calcula o número total de páginas e atualiza as opções de índice de página.
	 * @internal
	 */
	private calculatePages() {
		this.previousPageIndex = this.pageIndex;
		this.totalPages = Math.ceil(this.length / this.pageSize);

		if (this.totalPages < this.pageIndex) {
			this.pageIndex = this.totalPages - 1;
		}

		this.pageIndexOptions = Array.from({ length: this.totalPages }, (_, i) => i + 1);
	}

	/**
	 * Alterna a exibição das opções de tamanho da página.
	 * @param element - O elemento HTML que contém as opções de tamanho.
	 * @example
	 * this.toggleSizeOptions(element);
	 */
	toggleSizeOptions(element: HTMLDivElement) {
		this.closeAll();
		this.expandedOptions = !this.expandedOptions;
		if (element) {
			if (this.expandedOptions) {
				element.setAttribute('expanded', '');
			} else {
				element.removeAttribute('expanded');
			}
		}
	}

	/**
	 * Fecha as opções de tamanho da página.
	 * @param id - O ID do elemento HTML que contém as opções de tamanho.
	 * @example
	 * this.closeSizeOptions('list-options-size');
	 */
	closeSizeOptions(id: string) {
		this.expandedOptions = false;
		const listOptions = this.brPaginator.nativeElement.querySelector(`#${id}`) as HTMLDivElement;
		if (listOptions) {
			listOptions.removeAttribute('expanded');
		}
	}

	/**
	 * Define o tamanho da página.
	 * @param option - O tamanho da página a ser definido.
	 * @example
	 * this.setPageSize(20);
	 */
	setPageSize(option: number) {
		this.closeSizeOptions('list-options-size');
		this.pageSize = option;
		this.emitPageEvent();
		this.calculatePages();
	}

	/**
	 * Define o índice da página.
	 * @param pageIndex - O índice da página a ser definido.
	 * @example
	 * this.setPageIndex(2);
	 */
	setPageIndex(pageIndex: number) {
		this.previousPageIndex = this.pageIndex;
		this.closeSizeOptions('list-options-page');
		this.pageIndex = pageIndex - 1;
		this.emitPageEvent();
	}

	/**
	 * Emite o evento de mudança de página.
	 * @example
	 * this.emitPageEvent();
	 */
	emitPageEvent() {
		this.page.emit({
			length: this.length,
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			previousPageIndex: this.previousPageIndex,
		});
	}

	/**
	 * Fecha todas as opções de tamanho e índice de página.
	 * @example
	 * this.closeAll();
	 */
	closeAll() {
		if (this.expandedOptions) {
			this.closeSizeOptions('list-options-size');
			this.closeSizeOptions('list-options-page');
		}
	}
}
