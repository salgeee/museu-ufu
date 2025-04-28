import { Pipe, PipeTransform } from '@angular/core';
import { getIconByStateUtils, StateType } from '../../utils/get-icon-by-state.utils';

@Pipe({
	name: 'getIconByState',
	standalone: true,
})
export class GetIconByStatePipe implements PipeTransform {
	transform(state: StateType): string {
		return getIconByStateUtils(state);
	}
}
