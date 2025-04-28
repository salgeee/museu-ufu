import { SelectOptions } from '@shared/models/select.model';
import { CampusEnum } from '@shared/enums/campus.enum';

export const CAMPUS_OPTIONS_MOCK: SelectOptions = [
	{
		value: CampusEnum.MONTE_CARMELO,
		label: 'Campus Monte Carmelo',
	},
	{
		value: CampusEnum.PATOS_DE_MINAS,
		label: 'Campus Patos de Minas',
	},
	{
		value: CampusEnum.PONTAL,
		label: 'Campus Pontal',
	},
	{
		value: CampusEnum.SANTA_MONICA,
		label: 'Campus Santa Mônica',
	},

	{
		value: CampusEnum.UMUARAMA,
		label: 'Campus Umuarama',
	},
];
