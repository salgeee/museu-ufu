import { SelectOptions } from '../models/select.model';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';

export const INSTITUTION_TYPE_OPTIONS_MOCK: SelectOptions = [
	{
		value: InstitutionTypeEnum.PUBLIC_INSTITUTION,
		label: 'Instituição Pública',
	},
	{
		value: InstitutionTypeEnum.PRIVATE_INSTITUTION,
		label: 'Instituição Privada',
	},
	{
		value: InstitutionTypeEnum.FOREIGN_INSTITUTION,
		label: 'Instituição Estrangeira',
	},
	{
		value: InstitutionTypeEnum.OTHER,
		label: 'Outro',
	},
];
