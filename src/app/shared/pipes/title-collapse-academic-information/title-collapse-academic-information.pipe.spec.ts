import { AcademicInformation } from '@app/features/graduates/academic-information/models/academic-information.model';
import { TitleCollapseAcademicInformationPipe } from '@shared/pipes';

describe('TitleCollapseAcademicInformationPipe', () => {
	let pipe: TitleCollapseAcademicInformationPipe;

	beforeEach(() => {
		pipe = new TitleCollapseAcademicInformationPipe();
	});

	it('returns concatenated course name and institution initials', () => {
		const academicInformation: Partial<AcademicInformation> = {
			courseName: 'Ciência da Computação',
			institutionName: 'Universidade de Exemplo',
		};
		expect(pipe.transform(academicInformation)).toBe('Ciência da Computação - UE');
	});

	it('returns only course name if institution name is empty', () => {
		const academicInformation: Partial<AcademicInformation> = {
			courseName: 'Ciência da Computação',
			institutionName: '',
		};
		expect(pipe.transform(academicInformation)).toBe('Ciência da Computação - ');
	});

	it('returns only institution initials if course name is empty', () => {
		const academicInformation: Partial<AcademicInformation> = {
			courseName: '',
			institutionName: 'Universidade de Exemplo',
		};
		expect(pipe.transform(academicInformation)).toBe(' - UE');
	});

	it('returns empty string if both course name and institution name are empty', () => {
		const academicInformation: Partial<AcademicInformation> = { courseName: '', institutionName: '' };
		expect(pipe.transform(academicInformation)).toBe('');
	});

	it('handles null values gracefully', () => {
		const academicInformation: Partial<AcademicInformation> = { courseName: null, institutionName: null };
		expect(pipe.transform(academicInformation)).toBe('');
	});
});
