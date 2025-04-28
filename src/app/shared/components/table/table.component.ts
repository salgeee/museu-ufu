import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { DatePipe, NgClass } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { SizeOptions } from '../../types/size.type';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ButtonDirective } from '@shared/directives/button';

export interface Columns {
	columnDef: string;
	header: string;
	mask?: string;
	type?: 'text' | 'date' | 'link' | 'function' | 'icon';
	cell: Function;
	value?: Function;
}

export interface TableAction {
	label: string;
	action: Function;
}

/**
 * Componente TableComponent é responsável por exibir uma tabela com várias opções de configuração.
 * @example
 * <app-table [columns]="columns" [data]="data"></app-table>
 *
 * @public
 * {@link https://www.gov.br/ds/components/table?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-table',
	standalone: true,
	imports: [DatePipe, NgxMaskPipe, CdkTableModule, NgClass, CdkMenuModule, ButtonDirective],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
	/**
	 * Colunas da tabela.
	 * @type {Columns[]}
	 * @required
	 */
	@Input({ required: true }) columns: Columns[] = [];

	/**
	 * Dados a serem exibidos na tabela.
	 * @type {Array<any>}
	 * @required
	 */
	@Input({ required: true }) data: Array<any> = [];

	/**
	 * Tamanho da tabela.
	 * @type {SizeOptions}
	 * @default 'medium'
	 * @example
	 * <app-table size="large"></app-table>
	 */
	@Input() size: SizeOptions = 'medium';

	/**
	 * Indica se a tabela deve ter efeito de hover.
	 * @default false
	 * @type {boolean}
	 * @example
	 * <app-table [hovered]="true"></app-table>
	 */
	@Input({ transform: booleanAttribute }) hovered: boolean = false;

	/**
	 * Title of the table.
	 * @type {string}
	 * @default ''
	 */
	@Input({ alias: 'title-table' }) title: string = '';

	/**
	 * Ações disponíveis na tabela.
	 * @type {Array<TableAction>}
	 */
	@Input() actions: Array<TableAction> = [];

	/**
	 * Indica se o cabeçalho da tabela deve ser exibido.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) showHeader: boolean = false;

	public displayedColumns: string[] = [];

	constructor() {}

	ngOnInit(): void {
		this.displayedColumns = this.columns.map(c => c.columnDef);
	}

	trackByItem(item: any, index: number): number {
		return item?.id || index;
	}
}
