import {ChangeDetectionStrategy, Component, input} from '@angular/core';

/**
 * Componente ItemInfoComponent é responsável por exibir um rótulo e um valor.
 * @example
 * <app-item-info [label]="'Nome'" [value]="'João da Silva'"></app-item-info>
 */
@Component({
	selector: 'app-item-info',
	standalone: true,
	imports: [],
	templateUrl: './item-info.component.html',
	styleUrl: './item-info.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemInfoComponent {
	/**
	 * Rótulo do item.
	 * @required
	 */
	label = input<string>();

	/**
	 * Valor do item.
	 * @required
	 */
	value = input<string>();

	/**
	 * Tipo do campo de entrada.
	 * @default 'text'
	 */
	type = input<'text' | 'url' | 'email' | 'phone'>('text');
}
