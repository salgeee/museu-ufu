import { Component, Input } from '@angular/core';
import { SizeOptions } from '../../types/size.type';

/**
 * Componente MagicButtonComponent é responsável por exibir um botão mágico com ícone, conjunto de fontes, tamanho e rótulo configuráveis.
 * @example
 * <app-magic-button [icon]="'fa-magic'" [fontSet]="'fas'" [size]="'large'" [label]="'Clique Aqui'"></app-magic-button>
 *
 * @public
 * {@link https://www.gov.br/ds/components/magicbutton?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-magic-button',
	standalone: true,
	imports: [],
	host: {
		class: 'br-magic-button',
	},
	templateUrl: './magic-button.component.html',
	styleUrl: './magic-button.component.scss',
})
export class MagicButtonComponent {
	/** Ícone a ser exibido no botão. */
	@Input() icon = '';
	/** Conjunto de fontes a ser utilizado para o ícone. */
	@Input() fontSet = 'fas';
	/** Tamanho do botão. */
	@Input() size: SizeOptions = 'medium';
	/** Rótulo do botão. */
	@Input() label = '';
}
