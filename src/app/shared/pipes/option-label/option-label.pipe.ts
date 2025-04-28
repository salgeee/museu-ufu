import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '@shared/models/select.model';

/**
 * Pipe OptionLabelPipe é responsável por retornar o label de uma opção.
 * @example
 * <div>{{ value | optionLabel : options }}</div>
 * @standalone
 */
@Pipe({
	name: 'optionLabel',
	standalone: true,
})
export class OptionLabelPipe implements PipeTransform {
	transform(value: string, options: SelectOption[]): string {
		if (!value || !options) {
			return '';
		}

		const option = options.find(opt => opt.value === value);
		return option ? option.label : '--';
	}
}
