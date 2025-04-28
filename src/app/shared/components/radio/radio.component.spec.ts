import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
	let spectator: Spectator<RadioComponent>;
	const createComponent = createComponentFactory({
		component: RadioComponent,
	});

	beforeEach(() => {
		spectator = createComponent();
	});

	it('should create the component', () => {
		expect(spectator.component).toBeTruthy();
	});

	it('should display label when provided', () => {
		spectator.setInput('label', 'Rótulo');
		spectator.detectChanges();
		expect(spectator.query('.label')).toHaveText('Rótulo');
	});

	it('should display hint when provided', () => {
		spectator.setInput('hint', 'Informações adicionais');
		spectator.detectChanges();
		expect(spectator.query('.help-text')).toHaveText('Informações adicionais');
	});

	it('should render options vertically by default', () => {
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1 },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.detectChanges();
		expect(spectator.queryAll('.br-radio').length).toBe(2);
		expect(spectator.query('.d-inline-block')).toBeNull();
	});

	it('should render options horizontally when horizontal is true', () => {
		spectator.setInput('horizontal', true);
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1 },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.detectChanges();
		expect(spectator.queryAll('.d-inline-block').length).toBe(2);
	});

	it('should emit valueChange on option click', () => {
		const valueChangeSpy = jest.spyOn(spectator.component.valueChange, 'emit');
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1 },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.detectChanges();
		spectator.click(spectator.query('input[value="1"]'));
		expect(valueChangeSpy).toHaveBeenCalledWith(1);
	});

	it('should set aria-checked attribute correctly', () => {
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1 },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.setInput('value', 1);
		spectator.detectChanges();
		expect(spectator.query('input[value="1"]')).toHaveAttribute('aria-checked', 'true');
		expect(spectator.query('input[value="2"]')).toHaveAttribute('aria-checked', 'false');
	});

	it('should update value on option click', () => {
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1 },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.detectChanges();
		spectator.click(spectator.query('input[value="1"]'));
		expect(spectator.component.value).toBe(1);
	});

	it('should handle disabled state correctly', () => {
		spectator.setInput('options', [
			{ label: 'Opção 1', value: 1, disabled: true },
			{ label: 'Opção 2', value: 2 },
		]);
		spectator.detectChanges();
		expect(spectator.query('input[value="1"]').parentElement).toHaveClass('disabled');
		expect(spectator.query('input[value="2"]').parentElement).not.toHaveClass('disabled');
	});

	it('should call registerOnChange with the correct function', () => {
		const changeFn = jest.fn();
		spectator.component.registerOnChange(changeFn);
		spectator.component.onChange(1);
		expect(changeFn).toHaveBeenCalledWith(1);
	});

	it('should call registerOnTouched with the correct function', () => {
		const touchedFn = jest.fn();
		spectator.component.registerOnTouched(touchedFn);
		spectator.component['_touched']();
		expect(touchedFn).toHaveBeenCalled();
	});

	it('should update value when writeValue is called', () => {
		spectator.component.writeValue(2);
		expect(spectator.component.value).toBe(2);
	});

	it('should emit valueChange when value is set', () => {
		const valueChangeSpy = jest.spyOn(spectator.component.valueChange, 'emit');
		spectator.component.value = 3;
		expect(valueChangeSpy).toHaveBeenCalledWith(3);
	});

	it('should not emit valueChange when value is set to the same value', () => {
		spectator.component.value = 1;
		const valueChangeSpy = jest.spyOn(spectator.component.valueChange, 'emit');
		spectator.component.value = 1;
		expect(valueChangeSpy).toHaveBeenCalledWith(1);
	});
});
