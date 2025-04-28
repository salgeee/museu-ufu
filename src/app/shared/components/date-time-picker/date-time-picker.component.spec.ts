import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { DateTimePickerComponent } from './date-time-picker.component';
import { AbstractControl } from '@angular/forms';

describe('DateTimePickerComponent', () => {
	let spectator: Spectator<DateTimePickerComponent>;
	const createComponent = createComponentFactory({
		component: DateTimePickerComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should have the correct label input', () => {
		spectator.setInput('label', 'Test Label');
		expect(spectator.component.label).toBe('Test Label');
	});

	it('should have the correct id input', () => {
		spectator.setInput('id', 'test-id');
		expect(spectator.component.id).toBe('test-id');
	});

	it('should have the correct placeholder', () => {
		spectator.setInput('placeholder', 'Test Placeholder');
		expect(spectator.component.placeholder).toBe('Test Placeholder');
	});

	it('should set the correct type', () => {
		spectator.setInput('type', 'date_time');
		expect(spectator.component.type).toBe('datetime-local');
	});

	it('should normalize date correctly with Date', () => {
		const normalizedDate = spectator.component.normalizeDate(new Date(2024, 1, 2)); // February 2, 2024
		expect(normalizedDate).toBe('02/02/2024');
	});

	it('should normalize date correctly with string', () => {
		const normalizedDate = spectator.component.normalizeDate('02/02/2024'); // February 2, 2024
		expect(normalizedDate).toBe('02/02/2024');
	});

	it('should set the value correctly', () => {
		spectator.component.value = '2024-02-02';
		expect(spectator.component.value).toBe('2024-02-02');
	});

	it('should not set the value if disabled', () => {
		spectator.setInput('disabled', true);
		spectator.component.value = '2024-02-02';
		expect(spectator.component.value).toBeUndefined();
	});

	it('should call _change when value is set', () => {
		const changeSpy = jest.spyOn(spectator.component as any, '_change');
		spectator.component.value = '2024-02-02';
		expect(changeSpy).toHaveBeenCalledWith('2024-02-02');
	});

	it('should call _touched on blur', () => {
		const touchedSpy = jest.spyOn(spectator.component as any, '_touched');
		spectator.component.onBlur();
		expect(touchedSpy).toHaveBeenCalled();
	});

	it('should render the correct label', () => {
		spectator.setInput('label', 'Test Label');
		spectator.detectChanges();
		expect(spectator.query('label')).toHaveText('Test Label');
	});

	it('should have the correct id attributes', () => {
		spectator.setInput('id', 'test-id');
		spectator.detectChanges();
		expect(spectator.query('input')).toHaveAttribute('id', 'timepicker-test-id');
	});

	it('should apply the correct class when disabled', () => {
		spectator.setInput('disabled', true);
		spectator.detectChanges();
		expect(spectator.query('.br-input')).toHaveClass('disabled');
	});

	it('should set placeholder based on type and range', () => {
		spectator.setInput('range', true);
		spectator.component['_type'] = 'date';
		spectator.component.placeholder = '';
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('exemplo: 02/02/2024 até 03/02/2025');
	});

	it('should set placeholder based on type and range time', () => {
		spectator.setInput('range', true);
		spectator.component['_type'] = 'date_time';
		spectator.component.placeholder = '';
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('exemplo: 02/02/2024 02:02 até 03/02/2025 02:02');
	});

	it('should set placeholder for date type without range', () => {
		spectator.setInput('range', false);
		spectator.component['_type'] = 'date';
		spectator.component.placeholder = '';
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('exemplo: 02/02/2024');
	});

	it('should set placeholder for time type without range', () => {
		spectator.setInput('range', false);
		spectator.component['_type'] = 'time';
		spectator.component.placeholder = '';
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('exemplo: 02:40');
	});

	it('should set placeholder for date_time type without range', () => {
		spectator.setInput('range', false);
		spectator.component['_type'] = 'date_time';
		spectator.component.placeholder = '';
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('exemplo: 02/02/2024 02:02');
	});

	it('should not override existing placeholder', () => {
		spectator.setInput('placeholder', 'Existing Placeholder');
		spectator.component.ngOnInit();
		expect(spectator.component.placeholder).toBe('Existing Placeholder');
	});

	it('should write value correctly', () => {
		spectator.component.writeValue('02/02/2024');
		expect(spectator.component.value).toBe('02/02/2024');
	});

	it('should set disabled state correctly', () => {
		spectator.component.setDisabledState(true);
		expect(spectator.component.disabled).toBe(true);
	});

	it('should register onChange function', () => {
		const onChangeFn = jest.fn();
		spectator.component.registerOnChange(onChangeFn);
		spectator.component.value = '2024-02-02';
		expect(onChangeFn).toHaveBeenCalledWith('2024-02-02');
	});

	it('should register onTouched function', () => {
		const onTouchedFn = jest.fn();
		spectator.component.registerOnTouched(onTouchedFn);
		spectator.component.onBlur();
		expect(onTouchedFn).toHaveBeenCalled();
	});

	it('should set minDate correctly', () => {
		spectator.setInput('minDate', '2024-02-02');
		expect(spectator.component.minDate).toBe('2024-02-02');
	});

	it('should set maxDate correctly', () => {
		spectator.setInput('maxDate', '2025-02-02');
		expect(spectator.component.maxDate).toBe('2025-02-02');
	});

	it('should normalize minDate correctly when it is a Date object', () => {
		const date = new Date(2024, 1, 2); // February 2, 2024
		spectator.setInput('minDate', date);
		expect(spectator.component.normalizeDate(spectator.component.minDate)).toBe('02/02/2024');
	});

	it('should normalize maxDate correctly when it is a Date object', () => {
		const date = new Date(2025, 1, 2); // February 2, 2025
		spectator.setInput('maxDate', date);
		expect(spectator.component.normalizeDate(spectator.component.maxDate)).toBe('02/02/2025');
	});

	it('should set the minDate and maxDate in the component instance', () => {
		spectator.component.minDate = '02/02/2024';
		spectator.component.maxDate = '02/02/2025';
		spectator.component.ngAfterViewInit();
		expect(spectator.component.normalizeDate(spectator.component.minDate)).toBe('02/02/2024');
		expect(spectator.component.normalizeDate(spectator.component.maxDate)).toBe('02/02/2025');
	});

	it('should handle empty minDate input', () => {
		spectator.setInput('minDate', '');
		expect(spectator.component.minDate).toBe('');
	});

	it('should handle empty maxDate input', () => {
		spectator.setInput('maxDate', '');
		expect(spectator.component.maxDate).toBe('');
	});

	it('should return true if required is set to true', () => {
		spectator.setInput('required', true);
		expect(spectator.component.required).toBe(true);
	});

	it('should return false if required is set to false', () => {
		spectator.setInput('required', false);
		expect(spectator.component.required).toBe(false);
	});

	it('should return true if control has required validator', () => {
		spectator.component.control = { hasValidator: jest.fn().mockReturnValue(true) } as unknown as AbstractControl;
		expect(spectator.component.required).toBe(true);
	});

	it('should return false if control does not have required validator', () => {
		spectator.component.control = { hasValidator: jest.fn().mockReturnValue(false) } as unknown as AbstractControl;
		expect(spectator.component.required).toBe(false);
	});

	it('should set _required to true when required input is true', () => {
		spectator.setInput('required', true);
		expect(spectator.component['_required']).toBe(true);
	});

	it('should set _required to false when required input is false', () => {
		spectator.setInput('required', false);
		expect(spectator.component['_required']).toBe(false);
	});
});
