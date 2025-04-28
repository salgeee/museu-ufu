import { booleanAttribute, Component, Input } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';

/**
 * Componente de item de colapso.
 *
 * @selector app-collapse-item
 * @standalone true
 * @imports CdkAccordionModule
 */
@Component({
	selector: 'app-collapse-item',
	standalone: true,
	imports: [CdkAccordionModule],
	templateUrl: './collapse-item.component.html',
	styleUrl: './collapse-item.component.scss',
})
export class CollapseItemComponent {
	/**
	 * Rótulo do item de colapso.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) label: string;

	/**
	 * ID do item de colapso.
	 * @type {string}
	 * @required
	 */
	@Input({ required: true }) id: string;

	/**
	 * Indica se o item de colapso está expandido.
	 * @type {boolean}
	 * @default false
	 */
	@Input({ transform: booleanAttribute }) expanded: boolean = false;
}
