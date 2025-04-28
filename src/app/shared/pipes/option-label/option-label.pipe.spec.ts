import { OptionLabelPipe } from '@shared/pipes';
import { SelectOption } from '@shared/models/select.model';

describe('OptionLabelPipe', () => {
	let pipe: OptionLabelPipe;

	beforeEach(() => {
		pipe = new OptionLabelPipe();
	});

	it('returns the label of the matching option', () => {
		const options: SelectOption[] = [{ value: '1', label: 'Option 1' }];
		expect(pipe.transform('1', options)).toBe('Option 1');
	});

	it('returns "--" if no matching option is found', () => {
		const options: SelectOption[] = [{ value: '1', label: 'Option 1' }];
		expect(pipe.transform('2', options)).toBe('--');
	});

	it('returns an empty string if value is null', () => {
		const options: SelectOption[] = [{ value: '1', label: 'Option 1' }];
		expect(pipe.transform(null, options)).toBe('');
	});

	it('returns an empty string if options are null', () => {
		expect(pipe.transform('1', null)).toBe('');
	});

	it('returns an empty string if both value and options are null', () => {
		expect(pipe.transform(null, null)).toBe('');
	});

	it('returns an empty string if value is an empty string', () => {
		const options: SelectOption[] = [{ value: '1', label: 'Option 1' }];
		expect(pipe.transform('', options)).toBe('');
	});

	it('returns an empty string if options are an empty array', () => {
		expect(pipe.transform('1', [])).toBe('--');
	});
});
