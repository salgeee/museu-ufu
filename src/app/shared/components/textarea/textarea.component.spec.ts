import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TextareaComponent } from './textarea.component';
import { AbstractControl, FormControl } from '@angular/forms';

describe('TextareaComponent', () => {
	let spectator: Spectator<TextareaComponent>;
	const createComponent = createComponentFactory(TextareaComponent);

	beforeEach(() => {
		spectator = createComponent();
		spectator.component.control = new FormControl();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should have default values', () => {
		expect(spectator.component.label).toBe('');
		expect(spectator.component.id).toBeUndefined();
		expect(spectator.component.name).toBe('');
		expect(spectator.component.size).toBe('medium');
		expect(spectator.component.placeholder).toBe('');
		expect(spectator.component.hint).toBe('');
		expect(spectator.component.disabled).toBeFalsy();
		expect(spectator.component.readonly).toBeFalsy();
		expect(spectator.component.showLimit).toBeTruthy();
		expect(spectator.component.showCounter).toBeTruthy();
		expect(spectator.component.maxLength).toBeUndefined();
		expect(spectator.component.required).toBeFalsy();
	});

	it('should set and get value correctly', () => {
		spectator.component.value = 'test';
		expect(spectator.component.value).toBe('test');
	});

	it('should not set value if disabled', () => {
		spectator.component.disabled = true;
		spectator.component.value = 'test';
		expect(spectator.component.value).toBe('');
	});

	it('should write value when not disabled', () => {
		spectator.component.disabled = false;
		spectator.component.writeValue('new value');
		expect(spectator.component.value).toBe('new value');
	});

	it('should not write value when disabled', () => {
		spectator.component.disabled = true;
		spectator.component.writeValue('new value');
		expect(spectator.component.value).toBe('');
	});

	it('should validate control correctly', () => {
		const control = { errors: null } as AbstractControl;
		expect(spectator.component.validate(control)).toBeNull();
	});

	it('should set disabled state correctly', () => {
		spectator.component.setDisabledState(true);
		expect(spectator.component.disabled).toBeTruthy();
	});

	it('should register onChange function', () => {
		const fn = jest.fn();
		spectator.component.registerOnChange(fn);
		spectator.component['_change']('value');
		expect(fn).toHaveBeenCalledWith('value');
	});

	it('should register onTouched function', () => {
		const fn = jest.fn();
		spectator.component.registerOnTouched(fn);
		spectator.component['_touched']();
		expect(fn).toHaveBeenCalled();
	});

	it('should register onTouched from onBlur', () => {
		const fn = jest.fn();
		spectator.component.registerOnTouched(fn);
		spectator.component.onBlur();
		expect(fn).toHaveBeenCalled();
	});

	it('should register onValidatorChange function', () => {
		const fn = jest.fn();
		spectator.component.registerOnValidatorChange(fn);
		spectator.component['_validate']();
		expect(fn).toHaveBeenCalled();
	});

	it('should emit change event on onChange method call', () => {
		let output;
		spectator.output('textChange').subscribe(result => (output = result));

		const event = { target: { value: 'value' } } as unknown as Event;
		spectator.component.disabled = false;
		spectator.component.value = 'value';
		spectator.component.onChange(event);
		expect(output).toEqual('value');
	});

	it('should set required to true', () => {
		spectator.setInput('required', true);
		expect(spectator.component.required).toBeTruthy();
	});

	it('should set required to false', () => {
		spectator.setInput('required', false);
		expect(spectator.component.required).toBeFalsy();
	});

	it('should update _required when required is set', () => {
		spectator.component.required = true;
		expect(spectator.component['_required']).toBeTruthy();
		spectator.component.required = false;
		expect(spectator.component['_required']).toBeFalsy();
	});
});
