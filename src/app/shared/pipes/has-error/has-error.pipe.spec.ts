import { HasErrorPipe } from './has-error.pipe';
import { FormControl } from '@angular/forms';

describe('HasErrorPipe', () => {
	let pipe: HasErrorPipe;

	beforeEach(() => {
		pipe = new HasErrorPipe();
	});

	it('returns true if control is invalid, has the specified error, and is dirty or touched', () => {
		const control = new FormControl('', { validators: [() => ({ required: true })] });
		control.markAsDirty();
		expect(pipe.transform(control, 'required')).toBe(true);
	});

	it('returns false if control is valid', () => {
		const control = new FormControl('valid value');
		expect(pipe.transform(control, 'required')).toBe(false);
	});

	it('returns false if control does not have the specified error', () => {
		const control = new FormControl('', { validators: [() => ({ minLength: true })] });
		control.markAsDirty();
		expect(pipe.transform(control, 'required')).toBe(false);
	});

	it('returns true if control is invalid and dirty or touched without specifying an error', () => {
		const control = new FormControl('', { validators: [() => ({ required: true })] });
		control.markAsTouched();
		expect(pipe.transform(control)).toBe(true);
	});

	it('returns false if control is invalid but neither dirty nor touched', () => {
		const control = new FormControl('', { validators: [() => ({ required: true })] });
		expect(pipe.transform(control, 'required')).toBe(false);
	});

	it('returns false if control is valid and dirty or touched without specifying an error', () => {
		const control = new FormControl('valid value');
		control.markAsDirty();
		expect(pipe.transform(control)).toBe(false);
	});
});
