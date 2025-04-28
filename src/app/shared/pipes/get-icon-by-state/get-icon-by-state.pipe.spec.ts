import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';
import { GetIconByStatePipe } from '@shared/pipes';
import { ICONS_BY_STATE } from '../../utils/get-icon-by-state.utils';

describe('GetIconByStatePipe', () => {
	let spectator: SpectatorPipe<GetIconByStatePipe>;
	const createPipe = createPipeFactory(GetIconByStatePipe);

	it.each([
		['success', ICONS_BY_STATE['success']],
		['info', ICONS_BY_STATE['info']],
		['danger', ICONS_BY_STATE['danger']],
		['warning', ICONS_BY_STATE['warning']],
		[null, ''],
	])('should return the correct icon for a %s state', (state, iconExpected) => {
		spectator = createPipe(`{{ prop | getIconByState }}`, {
			hostProps: {
				prop: state,
			},
		});
		expect(spectator.element).toHaveText(iconExpected);
	});
});
