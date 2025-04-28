import { SelectOptions } from '../models/select.model';
import { CourseLevelEnum } from '../enums/course-level.enum';

export const COURSE_LEVEL_OPTIONS_MOCK: SelectOptions = [
	{ label: 'Graduação', value: CourseLevelEnum.GRADUATION },
	{ label: 'Mestrado', value: CourseLevelEnum.MASTER },
	{ label: 'Doutorado', value: CourseLevelEnum.DOCTORATE },
	{ label: 'Pós-Doutorado', value: CourseLevelEnum.POST_DOCTORATE },
	{ label: 'Especialização', value: CourseLevelEnum.SPECIALIZATION },
	{ label: 'Curso Técnico', value: CourseLevelEnum.TECHNICAL_COURSE },
	{ label: 'Curso Tecnólogo', value: CourseLevelEnum.ASSOCIATE_DEGREE },
	{ label: 'Bacharelado', value: CourseLevelEnum.BACHELOR },
	{ label: 'Licenciatura', value: CourseLevelEnum.LICENTIATE },
	{ label: 'MBA', value: CourseLevelEnum.MBA },
	{ label: 'Outro', value: CourseLevelEnum.OTHER },
];
