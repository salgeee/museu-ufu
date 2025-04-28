import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { SizeOptions } from '../../types/size.type';

export type Tabs = Array<TabItem>;

export interface TabItem {
	label: string;
	id: string | number;
	icon?: string;
	count?: number;
	active?: boolean;
}

/**
 * Componente TabsComponent é responsável por exibir abas com várias opções de configuração.
 * @example
 * <app-tabs [tabs]="[{ label: 'Tab 1', id: 1 }, { label: 'Tab 2', id: 2 }]" [(activeTab)]="activeTab"></app-tabs>
 *
 * @public
 * {@link https://www.gov.br/ds/components/tab?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-tabs',
	standalone: true,
	imports: [],
	host: {
		class: 'br-tab',
		role: 'tablist',
		'[class.small]': 'size === "small"',
		'[class.medium]': 'size === "medium"',
		'[class.large]': 'size === "large"',
	},
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
	/**
	 * Armazena o ID da aba ativa.
	 * @type {string | number}
	 * @private
	 */
	private _activeTab: string | number;

	/**
	 * Define o tamanho das abas.
	 * @type {SizeOptions}
	 * @default 'medium'
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Indica se as abas devem exibir apenas ícones.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) onlyIcon: boolean = false;

	/**
	 * Lista de abas.
	 * @type {Tabs}
	 * @required
	 */
	@Input({ required: true }) tabs: Tabs = [];

	/**
	 * Obtém o ID da aba ativa.
	 * @type {string | number}
	 */
	get activeTab(): string | number {
		return this._activeTab;
	}

	/**
	 * Define o ID da aba ativa e emite um evento de mudança.
	 * @type {string | number}
	 */
	@Input()
	set activeTab(value: string | number) {
		this._activeTab = value;
		this.activeTabChange.emit(value);
	}

	/**
	 * Evento emitido quando a aba ativa muda.
	 * @type {EventEmitter<string | number>}
	 */
	@Output() activeTabChange: EventEmitter<string | number> = new EventEmitter<string | number>();

	ngOnInit(): void {
		if (this.activeTab === undefined) this.activeTab = this.tabs.find(tab => tab.active)?.id || this.tabs[0]?.id;
	}

	selectedTab(tab: TabItem) {
		this.activeTab = tab.id;
	}
}
